window.addEventListener('DOMContentLoaded', init);

function init() {
    let json = {
        // shows all terms recently opened by user. note: newly created terms will be opened
        "recently_opened": [
            {
                "id": "Guid1",
                "term_name": "Terrm name 1",
                "tags": [
                    "CSE",
                    "CSE 110"
                ],
                "short_description": "Some description 1"
            },
            {
                "id": "Guid2",
                "term_name": "Terrm name 22",
                "tags": [
                    "CSE",
                    "CSE 101"
                ],
                "short_description": "Some descript 2"
            },
            {
                "id": "Guid3",
                "term_name": "Terrm name 23",
                "tags": [
                    "ENG",
                    "ENG 141"
                ],
                "short_description": "Some descript 3"
            }
        ],
        // shows all terms associated with inputed hashtag
        "tag_category": [
            {
                "tag_name": "CSE 110",
                "terms": [
                    {
                        "id": "TagTerm1",
                        "term_name": "Tag 1 Term name 1",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Tag 1 Term description 1."
                    },
                    {
                        "id": "TagTerm2",
                        "term_name": "Tag 1 Term name 2",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Tag 1 Term description 2"
                    }
                ]
            },
            {
                "tag_name": "CSE 101",
                "terms": [
                    {
                        "id": "TagTerm1",
                        "term_name": "Tag 2 Term name 1",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Tag 2 Term description 1."
                    },
                    {
                        "id": "TagTerm2",
                        "term_name": "Tag 2 Term name 2",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Tag 2 Term description 2"
                    }
                ]
            }
        ]
    }

    /** 
     * BACKEND: 
     * We need your functions so that we can call them in these next two functions:
     * 
     * addTermsToDocument(getRecentlyOpened());
     * addTagsToDocument(getPopularTags());
    */



    addTermsToDocument(json);
    addTagsToDocument(json);

}


function addTermsToDocument(terms) {
    let recentlyAddedEle = document.querySelector('div.recently-added-elements');
    terms.recently_opened.forEach(term => {

        let termCard = document.createElement('term-card');

        termCard.data = term;
        recentlyAddedEle.appendChild(termCard);
    });



}
function addTagsToDocument(terms) {
    let recentlyAddedEle = document.querySelector('div.popular-tags');
    let tagDiv = document.createElement('div');

    terms.tag_category.forEach(tag => {
        let tagName = document.createElement('h4');
        tagName.textContent = tag['tag_name'];
        tagDiv.appendChild(tagName);
        let tagTerms = document.createElement('div');
        tagTerms.style = "display: flex;"


        tag.terms.forEach(term => {
            let termCard = document.createElement('term-card');

            termCard.data = term;
            tagTerms.appendChild(termCard);
        });
        tagDiv.appendChild(tagTerms);
    });

    recentlyAddedEle.appendChild(tagDiv);
    // Commented for now, let me test the tag rows first



}
