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

var http = require('http');

module.exports = function (code, msg) {
    var err = new Error(msg || http.STATUS_CODES[code]);
    err.status = code;
    return err;
};
