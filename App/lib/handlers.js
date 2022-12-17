/*
*
*   Handlers
*
*/

var handlers = {}

// users handler
handlers.users = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405)
    }
};

// pin handler
handlers.ping = function(data, callback) {
    callback(200)
};

// not found handler
handlers.notFound = function(data, callback) {
     callback(404)
};

module.export = handlers;