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

// user containers
handlers._users = {};

// post users
// required data: firstName, lastName, phone, password, tosAgreement
// optional data: none
handlers._users.post = function(data, callback) {

}

// get users
handlers._users.get = function(data, callback) {

}

// put users
handlers._users.post = function(data, callback) {

}

// delete users
handlers._users.delete = function(data, callback) {

}

// pin handler
handlers.ping = function(data, callback) {
    callback(200)
};

// not found handler
handlers.notFound = function(data, callback) {
     callback(404)
};

module.export = handlers;