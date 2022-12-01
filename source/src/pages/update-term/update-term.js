import { initTinyMCE, getTinyMCEData } from '/src/components/tinyMCE/tiny-mce.js';
import * as backend_function from '/src/backend/dict.js';

let term_id = localStorage.getItem('get_term_id');
let button = document.getElementById('update_button');
let term_name = document.getElementById('term_name');
let tags = document.getElementById('tags');
let short_description = document.getElementById('short_description');
let data = {};

// Get the term information from backend
data = backend_function.selectTerm(term_id);
console.log(data)

// Populate data to respective element
init()

button.addEventListener('click', () => {
  data.term_name = term_name.value;
  data.tags = tags.value;
  data.short_description = short_description.value;
  data.term_data = getTinyMCEData();
  backend_function.updateTerm(data);
});

function init() {
  term_name.value = data.term_name;
  tags.value = data.tags.toString();
  short_description.value = data.short_description;
  initTinyMCE(data.term_data);
}

