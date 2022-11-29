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
  const cur_time = new Date();
  const termA = {
    id: 'ID#1',
    term_name: 'Term A',
    tags: ['tag1', 'tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'user',
    created_time: cur_time.toISOString(),
    edited_by: 'user',
    edited_date: cur_time.toISOString(),
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
    functions.updateRecents(termAid);
    functions.updateTags(termA);
    functions.updateTagCount(termA);
  });

  // Make sure terms count is 1 now
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
    functions.updateTerm(JSON.stringify(termA));
    const term = functions.selectTerm(termAid);
    expect(term.short_description).toBe(termA.short_description);
    expect(term.edit_count).toBe(1);
  });

  // Delete term
  test('Check deleting a term', () => {
    const termToDelete = functions.selectTerm(termAid);
    expect(functions.deleteTerm(termToDelete)).toBe(true);
  });

  // Try deleting term again and make sure terms count is 0
  test('Check double deleting a term and term count', () => {
    expect(functions.deleteTerm(termA)).toBe(false);
    expect(functions.termsCount()).toBe(0);
    // Print localStorage so see reminants
    console.log(localStorage.store);
  });
});

// Try testing with many terms
describe('Try Testing with Multiple Terms', () => {
  const cur_time = new Date();
  const terms = [{
    id: 'ID#0',
    term_name: 'Term B',
    tags: ['tag1', 'tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: cur_time.toISOString(),
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  },
  {
    id: 'ID#0',
    term_name: 'Term C',
    tags: ['tag1', 'tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: cur_time.toISOString(),
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  },
  {
    id: 'ID#0',
    term_name: 'Term D',
    tags: ['tag1', 'tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: cur_time.toISOString(),
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  },
  {
    id: 'ID#0',
    term_name: 'Term E',
    tags: ['tag2'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: cur_time.toISOString(),
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  },
  {
    id: 'ID#0',
    term_name: 'Term F',
    tags: ['tag1'],
    short_description: 'This is the term description',
    term_data: 'This is the term data',
    published: true,
    created_by: 'devOps',
    created_time: cur_time.toISOString(),
    edited_by: 'no one',
    edited_date: '',
    edit_count: 0
  }];
  const termids = ['ID#2', 'ID#3', 'ID#4', 'ID#5', 'ID#6'];

  // Make sure there are no terms at first
  test('Check there are 0 terms by default', () => {
    expect(functions.termsCount()).toBe(0);
    localStorage.clear();
  }); 

  // Add terms and make sure it returns the correct id
  test('Check adding terms', () => {
    let ids = [];
    for(let term of terms) {
      ids.push(functions.insertTerm(term));
      // Also update tags
      functions.updateTags(term);
      functions.updateTagCount(term);
    }
    expect(ids).toStrictEqual(termids);
  });

  // Make sure terms count is 5 now
  test('Check that there are 5 terms now', () => {
    expect(functions.termsCount()).toBe(5);
  });

  // Select terms using the terms' id
  test('Check selecting terms', () => {
    let terms_select = [];
    for(let termid of termids) {
      terms_select.push(functions.selectTerm(termid));
    }
    expect(terms_select).toStrictEqual(terms);
  });

  // Update terms' description and check if updated
  test('Check updating terms', () => {
    var editTerms = [];
    for(let term in terms) {
      terms[term].short_description = 'This is the new term description';
      functions.updateTerm(terms[term]);
      editTerms.push(functions.selectTerm(termids[term]));
    }
    // Change dates to ISOStrings;
    for(let element of terms){
      element.edited_date = element.edited_date.toISOString();
    }
    expect(editTerms).toStrictEqual(terms);
  });

  // Delete term C
  test('Check deleting term C', () => {
    const termToDelete = functions.selectTerm(termids[1]);
    expect(functions.deleteTerm(termToDelete)).toBe(true);
  });

  // Try deleting term C again and make sure term count is 4
  test('Check double deleting term C and term count', () => {
    expect(functions.deleteTerm(terms[1])).toBe(false);
    expect(functions.termsCount()).toBe(4);
  });

  var newTerms = [];

  // Select terms using the terms' id
  test('Check selecting remaining terms', () => {
    let terms_select = [];
    for(let termid in termids) {
      //skip term C
      if(termid==1)
        continue;
      terms_select.push(functions.selectTerm(termids[termid]));
      newTerms.push(terms[termid]);
    }
    expect(terms_select).toStrictEqual(newTerms);
  });

  /*
  // delete all terms and check count
  test('Check deleteing all terms and the terms count', () => {
    functions.deleteAll();
    expect(functions.termsCount()).toBe(0);
    // Print localStorage so see reminants
    console.log(localStorage.store);
  });
  */
});
