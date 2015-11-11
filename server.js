'use strict';

/**
 * Module dependencies.
 */
var api = require('./api/config/lib/app');
var apiServer = api.start();

var client = require('./client/config/lib/app');
var clientServer = client.start();
