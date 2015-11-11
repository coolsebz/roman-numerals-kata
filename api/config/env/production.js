'use strict';

module.exports = {
  // todo(seb): for ssl, I think it should look something like this
  // secure: {
  //   ssl: true,
  //   privateKey: './api/config/sslcerts/key.pem',
  //   certificate: './api/config/sslcerts/cert.pem'
  // },
  port: process.env.PORT || 3001, //note(seb): should switch to something like 8443 for SSL 
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/app',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  }
};