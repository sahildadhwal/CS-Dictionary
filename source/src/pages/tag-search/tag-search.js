window.addEventListener('DOMContentLoaded', init);
let tag_search_results = JSON.parse(localStorage.getItem('tag_search_results'));

function init() {
  addTagsToDocument(tag_search_results);
}

function addTermsToDocument(terms) {
  let recently_added_el = document.querySelector('div.card-results');
  terms.forEach((term) => {
    let term_card = document.createElement('term-card');
    term_card.data = term;
    recently_added_el.appendChild(term_card);
  });
}

function addTagsToDocument(tag_search_results) {
  let tag_rersult_el = document.querySelector('div.tag-results');

  tag_search_results.forEach((tag) => {
    let tag_name = document.createElement('button');
    tag_name.textContent = tag['tag_name'];
    tag_rersult_el.appendChild(tag_name);
    let tag_terms = document.createElement('div');
    tag_terms.className = 'tag-column';

    tag.terms.forEach((term) => {
      let term_card = document.createElement('term-card');

      term_card.data = term;
      tag_terms.appendChild(term_card);
    });
    tag_rersult_el.appendChild(tag_terms);
  });
}
