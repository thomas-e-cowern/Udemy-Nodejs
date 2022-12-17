// Library for data storage

// Depencies
var fs = require('fs');
var path = require('path');

// Container for the module
var lib = {}

// Base directory of data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback) {
    // Open file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            var stringData = JSON.stringify(data);

            // write to file and close
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if(!err) {
                    fs.close(fileDescriptor, function(err) {
                        if(!err) {
                            callback(false)
                        } else {
                            callback('Error closing new file')
                        }
                    })
                } else {
                    callback('Error writing to the new file')
                }
            })
        } else {
            callback('Could not create new file, it may already exist')
        }
    });
}

lib.read - function(dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function(err, data) {
        callback(err, data)
    });
};
// Module export
module.exports = lib;