import { initTinyMCE, getTinyMCEData } from '/src/components/tinyMCE/tiny-mce.js';
import * as backend_function from '/src/backend/dict.js';
import * as redirection from '/src/common-scripts/redirection.js'

let button = document.getElementById('create-button');
let draftButton = document.getElementById('draft-button');
let term_name = document.getElementById('term-name');
let tags = document.getElementById('tags');
let short_description = document.getElementById('short-description');
let data = {};

initTinyMCE();

button.addEventListener('click', () => {
  data.term_name = term_name.value;
  data.tags = tags.value;
  data.short_description = short_description.value;
  data.term_data = getTinyMCEData();
  data.published = true;
  backend_function.addTermToBackend(data);
  redirection.jumpPostHtml();
});

draftButton.addEventListener('click', () => {
  data.term_name = term_name.value;
  data.tags = tags.value;
  data.short_description = short_description.value;
  data.term_data = getTinyMCEData();
  data.published = false;
  backend_function.addTermToBackend(data);
  redirection.jumpPostHtml();
});
