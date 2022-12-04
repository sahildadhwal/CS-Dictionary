import * as backend_function from '/src/backend/dict.js';
import * as redirection from '/src/common-scripts/redirection.js'

let top_buttons = document.querySelector('.top-buttons');
let tag_container = document.querySelector('.tag-container');

let tag_search_results = localStorage.getItem("tag_search_results");

tag_search_results = [
  {
      "tag_name": "Tag 1",
      "terms": [
          {
              "term_name": "Term 1",
              "tags": [
                  "Tag 1"
              ],
              "short_description": "asdf",
              "term_data": "<p>asdfasdf</p>",
              "published": true,
              "id": "2cb2a170-7602-41e6-903e-0df9d89e35ca",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:07.371Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:07.371Z",
              "edit_count": 0
          },
          {
              "term_name": "Term 2",
              "tags": [
                  "Tag 1",
                  "Tag 2"
              ],
              "short_description": "asdfasd",
              "term_data": "<p>asdfasdf</p>",
              "published": true,
              "id": "5a53e88c-4f39-4de6-a503-4703c6937b82",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:18.305Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:18.305Z",
              "edit_count": 0
          },
          {
              "term_name": "Term 3",
              "tags": [
                  "Tag",
                  "Tag 1",
                  "Tag 2"
              ],
              "short_description": "asdf",
              "term_data": "<p>asdf</p>",
              "published": true,
              "id": "23083b6d-7787-49c4-bf6d-797fe15db234",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:37.859Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:37.859Z",
              "edit_count": 0
          }
      ]
  },
  {
      "tag_name": "Tag 2",
      "terms": [
          {
              "term_name": "Term 2",
              "tags": [
                  "Tag 1",
                  "Tag 2"
              ],
              "short_description": "asdfasd",
              "term_data": "<p>asdfasdf</p>",
              "published": true,
              "id": "5a53e88c-4f39-4de6-a503-4703c6937b82",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:18.305Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:18.305Z",
              "edit_count": 0
          },
          {
              "term_name": "Term 3",
              "tags": [
                  "Tag",
                  "Tag 1",
                  "Tag 2"
              ],
              "short_description": "asdf",
              "term_data": "<p>asdf</p>",
              "published": true,
              "id": "23083b6d-7787-49c4-bf6d-797fe15db234",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:37.859Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:37.859Z",
              "edit_count": 0
          }
      ]
  },
  {
      "tag_name": "Tag",
      "terms": [
          {
              "term_name": "Term 3",
              "tags": [
                  "Tag",
                  "Tag 1",
                  "Tag 2"
              ],
              "short_description": "asdf",
              "term_data": "<p>asdf</p>",
              "published": true,
              "id": "23083b6d-7787-49c4-bf6d-797fe15db234",
              "created_by": "user",
              "created_time": "2022-12-04T01:39:37.859Z",
              "edited_by": "user",
              "edited_date": "2022-12-04T01:39:37.859Z",
              "edit_count": 0
          }
      ]
  }
]

window.addEventListener('DOMContentLoaded', init);

function init() {
  addSearchBarToDocument();
  addTagsToDocument();
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

function addTagsToDocument() {
  tag_search_results.forEach(tag => {
    let tag_card = document.createElement('tag-card');
    tag_container.appendChild(tag_card);
    tag_card.data = tag;
  })
}
