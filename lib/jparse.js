'use strict';

var error = require('./error');

var emptyMessage = 'Invalid JSON, Empty Message Body';
var errorCode = 400;

//ExpressJS-Style JSON Parse
module.exports = function(buffer, options) {
    options = options || {};
    if(!buffer) { throw error(errorCode, emptyMessage); }
    var first = buffer.trim()[0];
    if (0 === buffer.length){ throw error(errorCode, emptyMessage);  }
    if (options.strict && '{' !== first && '[' !== first) {
        throw error(errorCode, 'Unable To Parse JSON In Strict Mode');
    }
    try { return JSON.parse(buffer, options.reviver); }
    catch(e) {
        var invalidJson = "Unable To Parse JSON. " + e;
        throw error(errorCode, invalidJson);
    }
};
