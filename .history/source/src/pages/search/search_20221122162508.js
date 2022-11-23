window.addEventListener('DOMContentLoaded', init);
let search_results = JSON.parse(localStorage.getItem('search_results'));

function init() {
  addTermsToDocument(search_results);
}

function addTermsToDocument(terms) {
  let recently_added_el = document.querySelector('div.card-results');
  terms.forEach((term) => {
    let term_card = document.createElement('term-card');
    term_card.data = term;
    recently_added_el.appendChild(term_card);
  });
}
