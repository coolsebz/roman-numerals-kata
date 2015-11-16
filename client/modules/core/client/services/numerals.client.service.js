'use strict';

//Expenses service used for communicating with the expenses REST endpoints
angular.module('core').factory('RomanNumeralsService', ['$resource',
  function ($resource) {
    return $resource(window.config.apiEndpoint + 'api/convert');
  }
]);
