'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'client/public/lib/normalize-css/normalize.css',
        'client/public/lib/angular-material/angular-material.css',
      ],
      js: [
        'client/public/lib/angular/angular.js',
        'client/public/lib/angular-resource/angular-resource.js',
        'client/public/lib/angular-animate/angular-animate.js',
        'client/public/lib/angular-messages/angular-messages.js',
        'client/public/lib/angular-ui-router/release/angular-ui-router.js',
        'client/public/lib/angular-ui-utils/ui-utils.js',
        'client/public/lib/angular-aria/angular-aria.min.js',
        'client/public/lib/angular-material/angular-material.min.js',
      ],
      tests: ['client/public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'client/modules/*/client/css/*.css'
    ],
    sass: [
      'client/modules/*/client/scss/*.scss'
    ],
    js: [
      'client/modules/core/client/app/config.js',
      'client/modules/core/client/app/init.js',
      'client/modules/*/client/*.js',
      'client/modules/*/client/**/*.js'
    ],
    views: ['client/modules/*/client/views/**/*.html'],
    // templates: ['client/build/templates.js'] //note(seb): this should be enabled in the future
  },
  //note(seb): we have to keep track of the small layer of the server for the client files
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'client/config/**/*.js', 'client/modules/*/server/**/*.js'],
    collections: 'client/modules/*/server/collections/**/*.js',
    routes: ['client/modules/!(core)/server/routes/**/*.js', 'client/modules/core/server/routes/**/*.js'],
    config: 'client/modules/*/server/config/*.js',
    policies: 'client/modules/*/server/policies/*.js', //note(seb): for the future, not included right now
    views: 'client/modules/*/server/views/*.html'
  }
};
