'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  // note(seb): DB is empty because it's all happening on the server
  db: {},  
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  app: {
    title: 'Roman Numerals Kata - Angular'
  },
  livereload: true,
};
