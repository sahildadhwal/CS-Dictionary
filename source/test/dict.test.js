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
global.localStorage = new LocalStorageMock();

class CryptoMock {
  constructor() {
    this.count = 0;
  }

  randomUUID() {
    return `ID#${++this.count}`;
  }
}

global.crypto = new CryptoMock();

// Try adding one term
describe('Try Adding 1 Term', () => {
  // Make sure there are no terms at first
  test('Check there are 0 terms by default', () => {
    const termCount = functions.termsCount();
    expect(termCount).toBe(0);
  }); 

  // Add a term and make sure it returns the correct id
  test('Check adding a term', () => {
    const termA = {
      id: 'ID#0',
      term_name: 'Test Term',
      tags: ['tag1', 'tag2'],
      short_description: 'This is the term description',
      term_data: 'This is the term data',
      published: true,
      created_by: 'jest',
      created_time: '',
      edited_by: 'no one',
      edited_date: '',
      edit_count: '0'
    };
    const id = functions.insertTerm(termA);
    expect(id).toBe('ID#1');
  });

  // Make sure term count is 1 now
  test('Check that there is 1 term now', () => {
    const termCount = functions.termsCount();
    expect(termCount).toBe(1);
  });
});
