const functions = require('../src/backend/dict.js');

/* 
  From: https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
  Used because Jest does not support use of localStorage.
  A way to mock localStorage so testing can still be done.
*/
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// Mock crypto that gives the same id every time so it can be used for testing
global.localStorage = new LocalStorageMock;

class CryptoMock {
  randomUUID() {
    return "THIS_IS_AN_ID";
  }
}

global.crypto = new CryptoMock;

describe('Test dict.js', () => {

  test('Check there are 0 terms by default', () => {
    const termCount =  functions.termsCount();
    expect(termCount).toBe(0);
  }); 

  test('Check adding a term', () => {
    const termA = {
      id: '',
      term_name: 'Test Term',
      tags: ['tag1', 'tag2'],
      short_description: 'This is the term description',
      term_data: 'This is the term data',
      published: true,
      created_by: 'jest',
      created_time: '',
      edited_by: 'noone',
      edited_date: '',
      edit_count: '0'
    }
    const id = functions.insertTerm(termA);
    expect(id).toBe('THIS_IS_AN_ID');
  });

  test('Check that there is 1 term now', () => {
    const termCount =  functions.termsCount();
    expect(termCount).toBe(1);
  });

});