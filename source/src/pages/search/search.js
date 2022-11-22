window.addEventListener('DOMContentLoaded', init);

let search_results = JSON.parse(localStorage.getItem('search_results'));

function init() {
    //Temporarily populating page with recent terms to test how it would visually look
    //TODO: Replace getDataOfRecents() with whatever search function Backend comes up with
    // addTermsToDocument(backend_function.getDataOfRecents());
    addTermsToDocument(search_results);
}

function addTermsToDocument(terms) {
    let recently_added_el = document.querySelector('div.card-results');
    terms.forEach(term => {
        let term_card = document.createElement('term-card');
        term_card.data = term;
        recently_added_el.appendChild(term_card);
    });
}