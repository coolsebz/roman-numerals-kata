'use strict';

var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  fs = require('fs'),
  path = require('path');

// Get files by glob patterns
var getGlobbedPaths = function(globPatterns, excludes) {

};

var validateEnvironmentVariable = function() {

};

// Validate Secure mode (optional, enable when needed)
// var validateSecureMode = function(config) {
// };

// Validate Session Secret (optional, enable when needed; serves as a protection against default values)
// var validateSessionSecret = function(config, testing) {
// };


// Initialize global configuration files
var initGlobalConfigFolders = function(config, assets) {

  // appending files
  config.folders = {
    server: {},
    client: {}
  };

  //Setting globbed client paths
  config.folders.client = getGlobbedPaths(path.join(process.cwd(), 'api/modules/*/client'), process.cwd().replace(new RegExp(/\\/g), '/'));
};

// Initialize global configuration
var initGlobalConfig = function() {

  // Check for NODE_ENV
  validateEnvironmentVariable();

  // Getting the default assets

  // Get the current assets

  // Merge the assets

  // Get the default config

  // Get the current config

  // Merge the config files
};

// Set the configuration 
module.exports = initGlobalConfig();