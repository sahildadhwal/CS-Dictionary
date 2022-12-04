import * as backend_function from '/src/backend/dict.js';
import * as redirection from '/src/common-scripts/redirection.js'

let top_buttons = document.querySelector('.top-buttons');

window.addEventListener('DOMContentLoaded', init);

function init() {
  addSearchBarToDocument();
}

function addSearchBarToDocument() {
  let search_bar = document.createElement('search-bar');
  top_buttons.appendChild(search_bar);

  search_bar.searchFunction = backend_function.findRequestedTag;
  search_bar.initSearchFunction = {
    "search_term": true,
    "search_tag": false,
    "search_description": true,
    "case_insensitive": true
  }
}

