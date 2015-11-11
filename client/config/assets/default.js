'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'client/public/lib/normalize-css/normalize.css',
        'client/public/lib/angular-material/angular-material.css',
        'client/public/lib/angular-chart.js/dist/angular-chart.css',
      ],
      js: [
        'client/public/lib/angular/angular.js',
        'client/public/lib/angular-resource/angular-resource.js',
        'client/public/lib/angular-animate/angular-animate.js',
        'client/public/lib/angular-messages/angular-messages.js',
        'client/public/lib/angular-ui-router/release/angular-ui-router.js',
        'client/public/lib/angular-ui-utils/ui-utils.js',
        'client/public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'client/public/lib/angular-file-upload/angular-file-upload.js',
        'client/public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'client/public/lib/angular-aria/angular-aria.min.js',
        'client/public/lib/angular-material/angular-material.min.js',
        'client/public/lib/Chart.js/Chart.min.js',
        'client/public/lib/angular-chart.js/dist/angular-chart.min.js',
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
    collections: 'modules/*/server/collections/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    config: 'modules/*/server/config/*.js',
    policies: 'api/modules/*/server/policies/*.js', //note(seb): for the future, not included right now
    views: 'modules/*/server/views/*.html'
  }
};
