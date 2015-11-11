'use strict';

var _ = require('lodash'),
  defaultClientAssets = require('./client/config/assets/default'),
  clientTestAssets = require('./client/config/assets/test'),
  clientTestConfig = require('./client/config/env/test'),
  defaultApiAssets = require('./api/config/assets/default'),
  apiTestAssets = require('./api/config/assets/test'),
  apiTestConfig = require('./api/config/env/test'),
  karmaReporters = ['progress'];

if(clientTestConfig.coverage) {
  karmaReporters.push('coverage');
}

// Karma configuration
module.exports = function(karmaConfig) {
  karmaConfig.set({
    // frameworks to use
    frameworks: ['jasmine'],

    preprocessors: {
      'client/modules/*/client/views/**/*.html': ['ng-html2js'],
      'client/modules/core/client/app/config.js': ['coverage'],
      'client/modules/core/client/app/init.js': ['coverage'],
      'client/modules/*/client/*.js': ['coverage'],
      'client/modules/*/client/config/*.js': ['coverage'],
      'client/modules/*/client/controllers/*.js': ['coverage'],
      'client/modules/*/client/directives/*.js': ['coverage'],
      'client/modules/*/client/services/*.js': ['coverage']
    },
    
    ngHtml2JsPreprocessor: {
      moduleName: 'app',
      cacheIdFromPath: function(filepath) {
        return filepath;
      }
    },

    // THe files and/or patterns to load into the browser
    files: _.union(
      defaultClientAssets.client.lib.js,
      defaultClientAssets.client.lib.tests,
      defaultClientAssets.client.js,
      clientTestAssets.tests.client,
      defaultClientAssets.client.views
    ),

    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: karmaReporters,

    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        // Reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // Output coverage to console
        { type: 'text' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    // Web Server port:
    port: 9876,

    // Colors in the logs
    colors: true,

    // Level of logging
    // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
    logLevel: karmaConfig.LOG_INFO,

    // Enable / disable watching file and executing test whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome', 'PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // If true, it capture browsers, run tests and exit
    singleRun: true
  });
};