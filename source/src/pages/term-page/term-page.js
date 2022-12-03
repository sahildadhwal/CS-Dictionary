import * as backend_function from '/src/backend/dict.js';
import * as tiny_mce from '/src/components/tinyMCE/tiny-mce.js'
import * as redirection from '/src/common-scripts/redirection.js'

window.addEventListener('DOMContentLoaded', init);

let term_id = localStorage.getItem('get_term_id');
let term_data = backend_function.selectTerm(term_id);
let term_title = document.getElementById('term-title');
let term_description = document.getElementById('term-description');
let tinyMCE_content = document.getElementById('tinyMCE-content');
let term_tags = document.querySelector('.term-tags');
let published_date = document.querySelector('.published-date');
let delete_btn = document.querySelector('#delete-button');
let update_btn = document.querySelector('#update-button');

function init() {
  if (term_data.published)
    backend_function.updateTagCount(term_data);
  populateTermData();
  tiny_mce.initNonEditableTinyMCE('#tinyMCE-content', term_data['term_data']);
}

function populateTermData() {
  term_title.innerHTML = term_data['term_name'];
  term_description.innerHTML = term_data['short_description'];
  // tinyMCE_content.innerHTML = term_data['term_data'];

  // Added " - Draft" after term name if it is a draft
  if (!term_data.published) {
    term_title.innerHTML += " <span> - Draft</span>";
  }

  let tag_list = term_data['tags'];
  for (let i = 0; i < tag_list.length; i++) {
    let tag_list_item = document.createElement('li');
    let tag_button = document.createElement('button');
    tag_button.innerHTML = tag_list[i];
    tag_list_item.appendChild(tag_button);
    term_tags.appendChild(tag_list_item);
  }
  published_date.textContent = `Published: ${new Date(term_data['created_time']).toLocaleString('en-US')}`;
}

// Handles the delete logic
// Get the modal
let modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
// Call backend to delete the term
delete_btn.addEventListener('click', () => {
  backend_function.deleteTerm(term_data);
});

// Handles the update logic
// Add event listener when clicking on update
update_btn.addEventListener('click', () => {
  // Set "update_term_id" to the curent id so update term page can fetch data
  localStorage.setItem('update_term_id', term_id);
  
  // Redirect to updating the term page
  redirection.jumpUpdateTermHtml();
})

