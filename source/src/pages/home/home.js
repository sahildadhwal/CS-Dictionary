import * as backend_function from '/src/backend/dict.js';

window.addEventListener('DOMContentLoaded', init);

let top_buttons = document.querySelector('.top-buttons');

function init() {
  addSearchBarToDocument();
  addTermsToDocument(backend_function.getDataOfRecents());
  addTagsToDocument(backend_function.getAllPopTags());
}

function addSearchBarToDocument() {
  let search_bar = document.createElement('search-bar');
  top_buttons.appendChild(search_bar);
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
