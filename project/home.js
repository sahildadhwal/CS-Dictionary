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
                "tags": [
                    {
                        "id": "Guid1",
                        "term_name": "Terrm name 1",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Some description 1"
                    }
                ]
            },
            {
                "tag_name": "CSE 101",
                "tags": [
                    {
                        "id": "Guid2",
                        "term_name": "Terrm name 22",
                        "tags": [
                            "CSE",
                            "CSE 110"
                        ],
                        "short_description": "Some descript 2"
                    }
                ]
            }
        ]
    }
    addTermsToDocument(json);
    //addTermsToDocument(json);

}


function addTermsToDocument(terms) {
    let recentlyAddedEle = document.querySelector('div.recently-added-elements');
    console.log(recentlyAddedEle)

    terms.recently_opened.forEach(term => {
        
        let termCard = document.createElement('term-card');
        
        termCard.data = term;
        recentlyAddedEle.appendChild(termCard);
    });

    
    
}





