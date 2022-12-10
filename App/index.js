/*
*   Primary file for API
*   Created by Thomas Cowern
*   10 December 2022
*/

// Dependencies
var http = require('http')
var url = require('url')

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

    // Send response
    res.end("Hello World\n");

    // Log path requested
    console.log('Path: ' + path )
    console.log('Trimmed Path: ' + trimmedPath )
    console.log('Mehod: ' + method )
    console.log('Query: ', queryString )
})

// Start the server and listen at port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000")
})