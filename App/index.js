/*
*   Primary file for API
*   Created by Thomas Cowern
*   10 December 2022
*/

// Dependencies
var http = require('http')

// The server will respond with a string
var server = http.createServer(function(req, res) {
    res.sendDate("Hellow World\n")
})

// Start the server and listen at port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000")
})