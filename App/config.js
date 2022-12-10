/*
*   Create and export configuration variables
*/

// Continer for environments
var environments = {};

// Stagig object (default)
environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
};

// Production object
environments.production = {
    'port' : 5000,
    'envName' : 'production'
};