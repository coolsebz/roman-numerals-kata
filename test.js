'use strict';

/**
 * Module dependencies.
 */
var app;

var path = require('path');
var api = require(path.resolve('.api/config/lib/app'));
var client = require(path.resolve('.client/config/lib/app'));

app.init(function () {
  console.log('Initialized api test automation');
});

client.init(function() {
	console.log('Initialized client test automation')
});
