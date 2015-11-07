'use strict';

// Protractor config
var config = {
  spects: ['api/modules/*/tests/e2e/*.js', 'client/modules/*/tests/e2e/*.js']
};

if(process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;