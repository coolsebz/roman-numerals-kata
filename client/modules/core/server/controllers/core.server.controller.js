'use strict';

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('client/modules/core/server/views/index', { 
    apiEndpoint: 'localhost:3001/' //todo(seb): make this take in consideration the environment
  });
  // note(seb): pass as the parameter to the index whatever user data you want in your SPA
};

exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      // todo(seb): add the nice way
      // res.render('modules/core/server/views/404', {
      //   url: req.originalUrl
      // });
      res.send('Not found');
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
