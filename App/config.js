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

// Exports to command line
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check current environment is authorized, if not set to default
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;