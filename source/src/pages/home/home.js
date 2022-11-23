import * as backend_function from '/src/backend/dict.js';
window.addEventListener('DOMContentLoaded', init);

let search_button = document.getElementById('search_button');
let search_element = document.getElementById('search_bar');
let search_input = '';
let search_results = {};

function init() {      
  addTermsToDocument(backend_function.getDataOfRecents());
  addTagsToDocument(backend_function.getAllPopTags());
}

function addTermsToDocument(terms) {
  let recently_added_el = document.querySelector('div.recently-added-elements');
  terms.forEach((term) => {
    let term_card = document.createElement('term-card');
    term_card.data = term;
    recently_added_el.appendChild(term_card);
  });
}

function addTagsToDocument(terms) {
  let recently_added_el = document.querySelector('div.popular-tags');
  let tag_div = document.createElement('div');

  terms.forEach((tag) => {
    let tag_name = document.createElement('h4');
    tag_name.textContent = tag['tag_name'];
    tag_div.appendChild(tag_name);
    let tag_terms = document.createElement('div');
    tag_terms.className = 'tag-column';

    tag.terms.forEach((term) => {
      let term_card = document.createElement('term-card');

      term_card.data = term;
      tag_terms.appendChild(term_card);
    });
    tag_div.appendChild(tag_terms);
  });

  recently_added_el.appendChild(tag_div);
}

search_element.addEventListener('input', (e) => {
  search_input = search_element.value;
  search_results = backend_function.findRequestedTerm(search_input, true, true, true);  
});

search_button.addEventListener('click', () => {
  localStorage.setItem('search_results', JSON.stringify(search_results));
});
