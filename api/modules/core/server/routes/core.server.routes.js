'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  //note(seb): don't do this, this should be in a different module!
  var romanNumerals = require('../controllers/roman-numerals.server.controller');

  // Return a 404 for all undefined api, module or lib routes
  // app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/').get(core.sendDetails);

  app.route('/api/convert').get(romanNumerals.convert);
};
