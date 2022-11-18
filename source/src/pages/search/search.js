window.addEventListener('DOMContentLoaded', init);
import * as backendFunction from '/src/backend/dict.js'

function init() {
    //Temporarily populating page with recent terms to test how it would visually look
    //TODO: Replace getDataOfRecents() with whatever search function Backend comes up with
    addTermsToDocument(backendFunction.getDataOfRecents());
}

function addTermsToDocument(terms) {
    let recentlyAddedEle = document.querySelector('div.card-results');
    terms.forEach(term => {
        console.log(term);
        let termCard = document.createElement('term-card');

        termCard.data = term;
        recentlyAddedEle.appendChild(termCard);
    });
}