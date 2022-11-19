window.addEventListener('DOMContentLoaded', init);
import * as backendFunction from '../../backend/dict.js'

function init() {
    
  addTermsToDocument(backendFunction.getDataOfRecents());
  addTagsToDocument(backendFunction.getAllPopTags());
}


function addTermsToDocument(terms) {
  let recentlyAddedEle = document.querySelector('div.recently-added-elements');
  terms.forEach(term => {

    let termCard = document.createElement('term-card');

    termCard.data = term;
    recentlyAddedEle.appendChild(termCard);
  });



}
function addTagsToDocument(terms) {
  let recentlyAddedEle = document.querySelector('div.popular-tags');
  let tagDiv = document.createElement('div');

  terms.forEach(tag => {
    let tagName = document.createElement('h4');
    tagName.textContent = tag['tag_name'];
    tagDiv.appendChild(tagName);
    let tagTerms = document.createElement('div');
    tagTerms.className = "tag-column";

    tag.terms.forEach(term => {
      let termCard = document.createElement('term-card');

      termCard.data = term;
      tagTerms.appendChild(termCard);
    });
    tagDiv.appendChild(tagTerms);
  });

  recentlyAddedEle.appendChild(tagDiv);
}
