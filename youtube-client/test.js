const assert = require('assert');
const testPage = require('./HelpFunctions.js');

describe('number of the current page', () => {
  it('1', () => {
    assert.equal(testPage.getCurrentPage(0, 3), 1);
  });
  it('2', () => {
    assert.equal(testPage.getCurrentPage(-990, 3), 2);
  });
  it('3', () => {
    assert.equal(testPage.getCurrentPage(-3960, 4), 4);
  });
  it('4', () => {
    assert.equal(testPage.getCurrentPage(-5280, 2), 9);
  });

});

describe('number of the current page', () => {
    it('1', () => {
      assert.equal(testPage.getNumberOfPages(15, 3), 5);
    });
    it('2', () => {
      assert.equal(testPage.getNumberOfPages(30, 4), 8);
    });
    it('3', () => {
      assert.equal(testPage.getNumberOfPages(45, 3), 15);
    });
    it('4', () => {
      assert.equal(testPage.getNumberOfPages(60, 2), 30);
    });
  
  });