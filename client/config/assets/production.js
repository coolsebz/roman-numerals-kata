'use strict';

module.exports = {
  client: {
    lib: {
      css: [],
      js: [
        'client/public/lib/angular/angular.min.js',
        'client/public/lib/angular-resource/angular-resource.min.js',
        'client/public/lib/angular-animate/angular-animate.min.js',
        'client/public/lib/angular-messages/angular-messages.min.js',
        'client/public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'client/public/lib/angular-ui-utils/ui-utils.min.js',
      ]
    },
    css: 'client/public/dist/application.min.css',
    js: 'client/public/dist/application.min.js'
  }
};
