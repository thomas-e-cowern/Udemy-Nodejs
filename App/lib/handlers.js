/*
*
*   Handlers
*
*/

var handlers = {}

// pin handler
handlers.ping = function(data, callback) {
    callback(200)
};

// not found handler
handlers.notFound = function(data, callback) {
     callback(404)
};

module.export = handlers;