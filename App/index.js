/*
*   Primary file for API
*   Created by Thomas Cowern
*   10 December 2022
*/

// Dependencies
var http = require('http');
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var url = require('url')
var config = require('./config')
var fileSystem = require('fs')
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');

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
    console.log("The HTTPS server is listening on port " + config.httpsPort + " in " + config.envName + " mode.");
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
    var queryStringObject = parsedUrl.query

    // Get http method
    var method = req.method.toLowerCase()

    // get the headers as an object
    var headers = req.headers

    // get the payload
    var decoder = new StringDecoder('utf-8')
    var buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();
  
        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
  
        // Construct the data object to send to the handler
        var data = {
          'trimmedPath' : trimmedPath,
          'queryStringObject' : queryStringObject,
          'method' : method,
          'headers' : headers,
          'payload' : helpers.parseJsonToObject(buffer)
        };
  
        // Route the request to the handler specified in the router
        chosenHandler(data,function(statusCode,payload){
  
          // Use the status code returned from the handler, or set the default status code to 200
          statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
  
          // Use the payload returned from the handler, or set the default payload to an empty object
          payload = typeof(payload) == 'object'? payload : {};
  
          // Convert the payload to a string
          var payloadString = JSON.stringify(payload);
  
          // Return the response
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(statusCode);
          res.end(payloadString);
          console.log(trimmedPath,statusCode);
          console.log(payload);
        });
  
    });
  };

// Router
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users
}