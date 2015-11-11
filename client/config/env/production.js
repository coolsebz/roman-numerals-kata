'use strict';

module.exports = {
  // todo(seb): for ssl, I think it should look something like this
  // secure: {
  //   ssl: true,
  //   privateKey: './config/sslcerts/key.pem',
  //   certificate: './config/sslcerts/cert.pem'
  // },
  port: process.env.PORT || 3000, //note(seb): should switch to something like 8443 for SSL 
  db: {},
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
