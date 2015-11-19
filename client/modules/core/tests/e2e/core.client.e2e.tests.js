'use strict';

describe('Core Client E2E Tests:', function () {
  describe('Test that the page is loading', function () {
    it('Compile correctly', function () {
      browser.get('http://localhost:3003/');
      expect(element).not.toBe(null);
    });
  });
});
