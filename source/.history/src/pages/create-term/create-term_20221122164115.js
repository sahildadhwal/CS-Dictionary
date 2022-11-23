import {initTinyMCE, getTinyMCEData} from '/src/components/tinyMCE/tiny-mce.js';
import * as backend_function from '/src/backend/dict.js';

let button = document.getElementById('create_button');
// console.log(button);
let term_name = document.getElementById('term_name');
let tags = document.getElementById('tags');
let short_description = document.getElementById('short_description');
let data = {};

initTinyMCE();

button.addEventListener('click', () => {
  data.term_name = term_name.value;
  data.tags = tags.value;
  data.short_description = short_description.value;
  data.term_data = getTinyMCEData();
  backend_function.addTermToBackend(data);
});
