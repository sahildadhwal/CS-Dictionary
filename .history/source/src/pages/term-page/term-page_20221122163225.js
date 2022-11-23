import * as backend_function from 'source/src/backend/dict.js';

window.addEventListener('DOMContentLoaded', init);

let term_id = localStorage.getItem('get_term_id');
let term_data = backend_function.selectTerm(term_id);
let term_title = document.getElementById('term-title');
let term_description = document.getElementById('term-description');
let tinyMCE_content = document.getElementById('tinyMCE-content');
let term_tags = document.querySelector('.term-tags');
let published_date = document.querySelector('.published-date');
let delete_btn = document.querySelector('.deletebtn');

function init() {
  populateTermData();
}

function populateTermData() {
  term_title.innerHTML = term_data['term_name'];
  term_description.innerHTML = term_data['short_description'];
  tinyMCE_content.innerHTML = term_data['term_data'];
  
  let tag_list = term_data['tags'];
  for(let i = 0; i < tag_list.length; i++) {
    let tag_list_item = document.createElement('li');
    let tag_button = document.createElement('button');
    tag_button.innerHTML = tag_list[i];
    tag_list_item.appendChild(tag_button);
    term_tags.appendChild(tag_list_item);
  }
  published_date.textContent = `Published: ${new Date(term_data['created_time']).toLocaleString('en-US')}`;
}

// Get the modal
let modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

delete_btn.addEventListener('click', function () {
  backend_function.deleteTerm(term_data);
});
