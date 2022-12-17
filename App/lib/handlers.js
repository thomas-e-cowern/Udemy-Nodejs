/*
*
*   Handlers
*
*/

import {read} from './data';
import {hash} from './helpers';

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
    // check for required fields
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure the user does not exist
       read('users', phone, function(err, data) {
            if (err) {
                // hash password
                var hashedPassword = hash(password)
            } else {
                callback(400, { 'Error' : 'A user with that phone number already exists' })
            }
       });

    } else {
        callback(400, {'Error' : 'Missing required fields'})
    };
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