import * as backend_function from '/src/backend/dict.js';
import * as redirection from '/src/common-scripts/redirection.js'

window.addEventListener('DOMContentLoaded', init);
let published_terms = backend_function.getPublished(); //Change function with backend's actual function


function init() {
  addTermsToDocument(published_terms);
}

function addTermsToDocument(terms) {
  let recently_added_el = document.querySelector('div.card-results');
  terms.forEach((term) => {
    let term_card = document.createElement('term-card');
    term_card.data = term;
    recently_added_el.appendChild(term_card);
  });
}
