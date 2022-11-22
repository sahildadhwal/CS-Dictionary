import * as backendFunction from '/src/backend/dict.js'

window.addEventListener('DOMContentLoaded', init);

let termID = localStorage.getItem('get_term_id');
let termData = backendFunction.selectTerm(termID);
let termTitle = document.getElementById('term-title')
let termDescription = document.getElementById('term-description')
let tinyMCEContent = document.getElementById('tinyMCE-content')
let termTags = document.querySelector('.term-tags')
let publishedDate = document.querySelector('.published-date')
let deleteBtn = document.querySelector('.deletebtn');

function init() {
    populateTermData();
}

function populateTermData() {
    termTitle.innerHTML = termData['term_name']
    termDescription.innerHTML = termData['short_description']
    tinyMCEContent.innerHTML = termData['term_data']
    
    let tagList = termData['tags']
    for(let i = 0; i < tagList.length; i++) {
        let tagListItem = document.createElement('li');
        let tagButton = document.createElement('button');
        tagButton.innerHTML = tagList[i];
        tagListItem.appendChild(tagButton);
        termTags.appendChild(tagListItem);
    }
    publishedDate.textContent = `Published: ${new Date(termData['created_time']).toLocaleString("en-US")}`;
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

deleteBtn.addEventListener('click', function () {
    backendFunction.deleteTerm(termData);
})