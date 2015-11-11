'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {},
  port: process.env.PORT || 3003, 
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment'
  },
  // This config is set to true during gulp coverage
  coverage: process.env.COVERAGE || false
};
