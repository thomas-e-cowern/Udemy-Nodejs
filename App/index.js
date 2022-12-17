/*
*   Primary file for API
*   Created by Thomas Cowern
*   10 December 2022
*/

// Dependencies
var http = require('http');
var https = require('https');
const {StringDecoder} = require('string_decoder');
var url = require('url')
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config')
var fileSystem = require('fs')
var _data = require('./lib/data')

// Testing
// _data.create('test', 'newFile', {'foo' : 'bar'}, function(err) {
//     console.log('DEBUG: Error in create: ', err);
// })

// _data.update('test', 'newFile', {'name' : 'bill'}, function(err) {
//     console.log('DEBUG: Error in update: ', err);
// })

// _data.read('test', 'newFile', function(err, data) {
//     if (err) {
//         console.log('Error reading data: ', err)
//     } else {
//         console.log(data)
//     }
// })

_data.delete('test', 'newFile', function(err) {
    if (err) {
        console.log('Error deleting data: ', err)
    } else {
        console.log('Deleted!')
    }
})

// Instantiating http server
var httpServer = http.createServer(function(req, res) {

    unifiedServer(req, res)
    
})

// Start the server and listen at port 3000
httpServer.listen(config.httpPort, function(){
    console.log("The server is listening on port " + config.httpPort + " in " + config.envName + " mode.");
})

// instantiate the https server
httpsServerOptions = {
    'key' : fileSystem.readFileSync('./https/key.pem'),
    'cert' : fileSystem.readFileSync('./https/cert.pem')
}

var httpsServer = https.createServer(httpsServerOptions, function(req, res) {

});

// start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log("The server is listening on port " + config.httpsPort + " in " + config.envName + " mode.");
})


// Unified server to handle both http and https
var unifiedServer = function(req, res) {
    // Get and parse url
    var parsedUrl = url.parse(req.url, true);

    // Get path from url
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/\/+|\/+$/g,'')

    // Get the query string
    var queryString = parsedUrl.query

    // Get http method
    var method = req.method

    // get the headers as an object
    var headers = req.headers

    // get the payload
    var stringDecoder = new StringDecoder('utf-8')
    var buffer = '';

    req.on('data', function(data) {
        buffer += stringDecoder.write(data);
    });

    req.on('end', function() {
        buffer += stringDecoder.end();

        // Choose handler, not found is default
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Contruct data object
        var data = {
            'trimmedPath' : trimmedPath,
            'queryString' : queryString,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route request to handler
        chosenHandler(data, function(statusCode, payload) {
            // status code or default
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200

            // use payload or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Conver to string
            var payloadString = JSON.stringify(payload);

            // Return response
            res .setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)

            res.end(payloadString)

            console.log('Response: ', statusCode, ' Payload: ', payloadString )
        });
    });
};

// Handerls
var handlers = {}

handlers.ping = function(data, callback) {
    callback(200)
}

handlers.notFound = function(data, callback) {
     callback(404)
}

// Router
var router = {
    'ping' : handlers.ping
}