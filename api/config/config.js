'use strict';

var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  fs = require('fs'),
  path = require('path');

// Get files by glob patterns
var getGlobbedPaths = function(globPatterns, excludes) {

  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;

};

var validateEnvironmentVariable = function() {
  var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white(''));
};

// Validate Secure mode (optional, enable when needed)
// var validateSecureMode = function(config) {
// };

// Validate Session Secret (optional, enable when needed; serves as a protection against default values)
// var validateSessionSecret = function(config, testing) {
// };


// Initialize global configuration folders
var initGlobalConfigFolders = function(config, assets) {

  // appending files
  config.folders = {
    server: {},
    client: {}
  };

  //Setting globbed client paths
  config.folders.client = getGlobbedPaths(path.join(process.cwd(), 'api/modules/*/client'), process.cwd().replace(new RegExp(/\\/g), '/'));
};

var initGlobalConfigFiles = function(config, assets) {
  
  // Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);

  // (In the future)
  // Globbed socket files
  config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

};

// Initialize global configuration
var initGlobalConfig = function() {

  // Check for NODE_ENV
  validateEnvironmentVariable();

  // Getting the default assets
  var defaultAssets = require(path.join(process.cwd(), 'api/config/assets/default'));  

  // Get the current assets
  var environmentAssets = require(path.join(process.cwd(), 'api/config/assets/', process.env.NODE_ENV)) || {};

  // Merge the assets
  var assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'api/config/env/default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'api/config/env/', process.env.NODE_ENV)) || {};  

  // Merge the config files
  var config = _.merge(defaultConfig, environmentConfig);

  // note(seb): if needed, add the package.json info to the config as well
  // config.packageFile = require(path.resolve('./package.json'));

  // note(seb): This should be added
  // If running in dev or production mode, then we can extend the config files with an uncommited local file
  // if (process.env.NODE_ENV !== 'test') {
  //   config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'api/config/env/local.js')) && require(path.join(process.cwd(), 'api/config/env/local.js'))) || {});
  // }

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  // Just exposing the getGlobbedPath function so it can be used elsewhere
  config.utils = {
    getGlobbedPaths: getGlobbedPaths,
  };

  return config;
};

// Set the configuration 
module.exports = initGlobalConfig();