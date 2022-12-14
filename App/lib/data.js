// Library for data storage

// Depencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

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

// Read data from a file
lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err,data){
      if(!err && data){
        var parsedData = helpers.parseJsonToObject(data);
        callback(false,parsedData);
      } else {
        callback(err,data);
      }
    });
  };  

lib.update = function(dir, file, data, callback) {
    // Open file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            var stringData = JSON.stringify(data);

            // write to file and close
            fs.ftruncate(fileDescriptor, function(err) {
                if(!err) {
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if(!err) {
                            fs.close(fileDescriptor, function(err) {
                                if(!err) {
                                    callback(false)
                                } else {
                                    callback('Error closing existing file')
                                }
                            })
                        } else {
                            callback('Error writing to existing file')
                        }
                    })
                } else {
                    callback('Error truncating file')
                }
            });
        } else {
            callback('Could not create new file, it may not exist yet')
        }
    });
}

lib.delete = function(dir, file, callback) {
    // unlink the file
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err) {
        if (!err) {
            callback(false)
        } else {
            console.log("DEBUG: Error deleting file")
        }
    })
};

// Module export
module.exports = lib;