/*jshint expr: true*/
//note(seb): this allows us to do stuff like should.be.true;

'use strict';

var should = require('should'),
  path = require('path'),
  romanNumerals = require(path.resolve('./api/modules/core/server/controllers/roman-numerals.server.controller'));

/**
 * Globals
 */

describe('Roman Numerals Controller Logic', function() {

  it('should convert 1 to I', function(done) {
    romanNumerals.arabicToRoman(1).should.equal('I');
    done();
  });

  it('should convert 5 to V', function(done) {
    romanNumerals.arabicToRoman(5).should.equal('V');
    done();
  });

  it('should convert 10 to X', function(done) {
    romanNumerals.arabicToRoman(10).should.equal('X');
    done();
  });

});