window.addEventListener('DOMContentLoaded', init);
import * as backendFunction from '/src/backend/dict.js'

let searchResults = JSON.parse(localStorage.getItem('search_results'));

function init() {
    //Temporarily populating page with recent terms to test how it would visually look
    //TODO: Replace getDataOfRecents() with whatever search function Backend comes up with
    // addTermsToDocument(backendFunction.getDataOfRecents());
    addTermsToDocument(searchResults);
}

function addTermsToDocument(terms) {
    let recentlyAddedEle = document.querySelector('div.card-results');
    terms.forEach(term => {
        let termCard = document.createElement('term-card');

        termCard.data = term;
        recentlyAddedEle.appendChild(termCard);
    });
}