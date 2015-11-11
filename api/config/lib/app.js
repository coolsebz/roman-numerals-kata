'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongoose = require('./mongoose'),
  express = require('./express'),
  chalk = require('chalk');

// Initialize models
// note(seb): This is actually a function in the config file, not the actual mongoose library
mongoose.loadModels();

module.exports.loadModels = function() {
  mongoose.loadModels();
};

module.exports.init = function(callback) {
  mongoose.connect(function(db) {
    // Setup express
    var app = express.init(db);
    if(callback) callback(app, db, config);
  });
};

module.exports.start = function(callback) {
  var _this = this;

  _this.init(function(app, db, config) {

    // Start listening on the configured port
    app.listen(config.port, function() {
      // Logging some information about the server starting up
      console.log('---');
      console.log(chalk.green('Server: Starting up'));
      console.log(chalk.green('Env:\t\t\t' + process.env.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t' + config.port));
      console.log(chalk.green('DB:\t\t\t' + config.db.uri));
      console.log('---');

      if(callback) callback(app, db, config);
    });

  });
};