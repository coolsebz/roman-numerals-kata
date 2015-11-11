'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  express = require('./express'),
  chalk = require('chalk');

module.exports.init = function init(callback) {
  // Initialize express

  // note(seb): passing DB as an empty object because it's not going to be used later on
  var app = express.init({});
  if (callback) callback(app, {}, config);
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port>
    app.listen(config.port, function () {

      // Logging some information about the server starting up
      console.log('---');
      console.log(chalk.green('Client: Starting up'));
      console.log(chalk.green('Env:\t\t\t' + process.env.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t' + config.port));
      console.log('---');

      if (callback) callback(app, db, config);
    });

  });

};
