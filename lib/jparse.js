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

var error = require('./error');

//ExpressJS-Style JSON Parse
module.exports = function(buffer, options) {
    var first = buffer.trim()[0];
    if (0 === buffer.length){ throw error(400, 'Invalid Json, Empty Body');  }
    if (options.strict && '{' !== first && '[' !== first) { throw error(400, 'Invalid Json'); }
    return JSON.parse(buffer, options.reviver);
};
