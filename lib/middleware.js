/******************************************************************************
 * 
 * QUANEO OPEN SOURCE
 * __________________
 * 
 * [2013] - [2014] Quaneo Ltd.
 * All Rights Reserved.
 * 
 * This software may be freely distributed under the MIT license.
 *
 * Authors: 
 * Alex Curtis, Quaneo Ltd
 *
 *****************************************************************************/
 
"use strict";

var rawbody = require('raw-body');
var typeis = require('type-is');

var jparse = require('./jparse');
var Signature = require('./signature');

module.exports = function(options) {
    options = options || {};
    var strict = options.strict !== false;
    var reviver = options.reviver;
    var encoding = options.encoding || 'utf8';

    return function(req, res, next) {

        //ExpressJS Pipeline
        if (req._body) { return next(); }
        req.body = req.body || {};
        if (!typeis(req, 'json')) { return next(); }
        
        //X-Hub Check
        var xhub = req.header('X-Hub-Signature');
        if(!xhub) { return next(); }

        //Flag As Parsed (ExpressJS) -- Everything is here.
        req._body = true;

        var length = req.header('content-length');
        var limit = options.limit || '100kb';

        var rawOptions = {
            length: length,
            limit: limit,
            encoding: encoding
        };

        rawbody(req, rawOptions, function (err, buffer) {
            if (err) { return next(err); }
            //Attach Signature Toolchain
            var xHubSignature = req.header('X-Hub-Signature');
            var signature = new Signature(xHubSignature);
            signature.attach(req, buffer);

            //ExpressJS-Style JSON Parse
            try {
                var options = { strict: strict, reviver: reviver };
                req.body = jparse(buffer, options);
            }
            catch (err){
                err.body = buffer;
                err.status = 400;
                return next(err);
            }
            next();
        });
    };
};
