'use strict';

module.exports = {

  // note(seb): this is just a server setup, so that's why there are no client settings
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'api/config/**/*.js', 'api/modules/*/server/**/*.js'],
    models: 'api/modules/*/server/models/**/*.js',
    collections: 'api/modules/*/server/collections/**/*.js',
    routes: ['api/modules/!(core)/server/routes/**/*.js', 'api/modules/core/server/routes/**/*.js'],
    sockets: 'api/modules/*/server/sockets/**/*.js',
    config: 'api/modules/*/server/config/*.js',
    policies: 'api/modules/*/server/policies/*.js', //note(seb): for the future, not included right now
    views: 'api/modules/*/server/views/*.html'
  },
  client: { }
};
