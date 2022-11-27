/// <reference types="jest" />
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

// Try testing with one term
describe('Try Testing with 1 Term', () => {
  const termA = {
    id: 'ID#0',
    term_name: 'Term A',
    tags: ['tag1', 'tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: '',
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  };
  const termAid = 'ID#1';

  // Make sure there are no terms at first
  test('Check there are 0 terms by default', () => {
    expect(functions.termsCount()).toBe(0);
  }); 

  // Add a term and make sure it returns the correct id
  test('Check adding a term', () => {
    expect(functions.insertTerm(termA)).toBe(termAid);
    // Also update tags
    functions.updateTags(termA);
    functions.updateTagCount(termA);
  });

  // Make sure term count is 1 now
  test('Check that there is 1 term now', () => {
    expect(functions.termsCount()).toBe(1);
  });

  // Select term A using the term's id
  test('Check selecting a term', () => {
    expect(functions.selectTerm(termAid)).toStrictEqual(termA);
  });

  // Update term's description and check if updated
  test('Check updating a term and edit count', () => {
    termA.short_description = 'This is the new term description';
    const id = functions.updateTerm(termA);
    const term = functions.selectTerm(termAid);
    expect(term.short_description).toBe(termA.short_description);
    expect(term.edit_count).toBe(1);
  });

  // Delete term
  test('Check deleting a term', () => {
    const termToDelete = functions.selectTerm(termAid);
    expect(functions.deleteTerm(termToDelete)).toBe(true);
  });

  // Try deleting term again and make sure term count is 0
  test('Check double deleting a term and term count', () => {
    expect(functions.deleteTerm(termA)).toBe(false);
    expect(functions.termsCount()).toBe(0);
    // Print localStorage so see reminants
    console.log(localStorage.store);
  });
});
