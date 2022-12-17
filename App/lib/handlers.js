// Handerls
var handlers = {}

handlers.ping = function(data, callback) {
    callback(200)
}

handlers.notFound = function(data, callback) {
     callback(404)
}
