/*
*
*   Helpers file for various tasks
*
*/

var config = require('./../config');

// Depencies
var crypto = require('crypto');

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
}




module.exports = helpers;