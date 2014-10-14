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

var crypto = require('crypto');
var _ = require("underscore");

var signature = function(xhub, options){
    this.xhub = xhub;
    options = options || {};
    this.algorithm = options.algorithm || 'sha1';
    this.secret = options.secret;
};

_.extend(signature.prototype, {

    attach: function(req, buffer){
        var self = this;
        req.isXHubValid = function(){
            return signature.prototype.isValid.call(self, buffer);
        };
    },

    isValid: function(buffer){
        if(!this.secret) { throw new Error('No Secret Found'); }
        var hmac = crypto.createHmac(this.algorithm, this.secret);
        hmac.update(buffer);
        var expected = this.algorithm + '=' + hmac.digest('hex');
        return this.xhub === expected;
    }

});

module.exports = signature;
