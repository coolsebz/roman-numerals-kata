'use strict';

//note(seb): normally this would be whatever module there is, core should be reserved for core only resources
angular.module('core').controller('RomanNumeralsController', [ 'RomanNumeralsService',
  function(RomanNumeralsService) {
    
    var scope = this;

    scope.romanToArabic = function() {
      console.log(scope.romanNumeral);
    };

    scope.arabicToRoman = function() {
      console.log(scope.arabicNumeral);
    };
    

  }
]);