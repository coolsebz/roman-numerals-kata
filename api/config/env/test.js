'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/app-test',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  port: process.env.PORT || 3002,
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment'
  },
  // This config is set to true during gulp coverage
  coverage: process.env.COVERAGE || false
};
