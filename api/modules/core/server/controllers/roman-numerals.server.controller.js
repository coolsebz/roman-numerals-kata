'use strict';

exports.convert = function(req, res) {
  res.json({ okay: 'okay' });
};


exports.arabicToRoman = function(arabicNumber) {
  if(arabicNumber === 1) {
    return 'I';
  }
  if(arabicNumber === 5) {
    return 'V';
  }

  if(arabicNumber === 10) {
    return 'X';
  }
};