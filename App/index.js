/*
*   Primary file for API
*   Created by Thomas Cowern
*   10 December 2022
*/

// Dependencies
var http = require('http');
const {StringDecoder} = require('string_decoder');
var url = require('url')
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config')

// The server will respond with a string
var server = http.createServer(function(req, res) {

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

    // Send response
    // res.end("Hello World\n");

    // Log path requested
    // console.log('Path: ' + path )
    // console.log('Trimmed Path: ' + trimmedPath )
    // console.log('Mehod: ' + method )
    // console.log('Query: ', queryString )
    console.log('Headers: ', headers )
    
})

// Start the server and listen at port 3000
server.listen(config.port, function(){
    console.log("The server is listening on port " + config.port + " in " + config.envName + " mode.");
})

// Handerls
var handlers = {}

// Sample handler
handlers.sample = function(data, callback) {
    // Callback http status code and payload
    callback(406, {'name':'Sample Handler'})
}

handlers.notFound = function(data, callback) {
     callback(404)
}

// Router
var router = {
    'sample' : handlers.sample
}