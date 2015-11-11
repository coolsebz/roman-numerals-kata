'use strict';

module.exports = {

  // note(seb): this is just a server setup, so that's why there are no client settings
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    collections: 'modules/*/server/collections/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js', //note(seb): for the future, not included right now
    views: 'modules/*/server/views/*.html'
  },
  client: { }
};
