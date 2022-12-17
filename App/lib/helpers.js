/*
*
*   Helpers file for various tasks
*
*/



// Depencies
var crypto = require('crypto');
var config = require('./../config'); 

// Helpers container
var helpers = {};

// Hash function
// create a SHA256 hash
helpers.hash = function(str) {
    if (typeof(str) == 'string' && str.length >  0) {
        var hash = crypto.createHash('sha256', config.hashingSecret).update(str).digest('hex');
        return hash
    } else {
        return false;
    }
};

// Parse string and return value if valid
helpers.parseJsonToObject = function (str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (err) {
        return {}
    }
}

module.exports = helpers;