// https://bendyworks.com/blog/native-web-components
// https://codepen.io/bugrakocak/pen/EMbKoB
import * as backend_function from '/src/backend/dict.js';
import * as redirection from '/src/common-scripts/redirection.js'

class SearchBar extends HTMLElement {

    constructor() {
        super();
        let shadow_el;
        const MAXIMUM_ELEMENT_DISPLAY = 5;
    }

    connectedCallback() {
        this.shadow_el = this.initShadowDom();
        this.initSearchFunction();
    }

    initShadowDom() {
        let shadow_el = this.attachShadow({ mode: 'open' });
        shadow_el.innerHTML = this.template;

        return shadow_el;
    }

    initSearchFunction() {
        const containerEl = this.shadow_el.querySelector('.container')
        const formEl = this.shadow_el.querySelector('#search')
        const dropEl = this.shadow_el.querySelector('.drop')
        let search_results = {};

        // Add event listener when pressing enter key
        formEl.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                // Only redirect when user input not empty
                if (formEl.value.length != 0) {
                    localStorage.setItem('search_results', JSON.stringify(search_results));
                    redirection.jumpSearchHtml();
                }
            }
        });

        const goToTermPage = (e) => {
            localStorage.setItem('get_term_id', e.currentTarget.term_id);
            redirection.jumpTermPageHtml();
        }

        const formHandler = (e) => {
            const user_input = e.target.value;

            // Call search function from back-end to get list of terms
            search_results = backend_function.findRequestedTerm(user_input, true, true, true);

            // If user don't input then make dropdown empty
            if (user_input.length === 0) {
                dropEl.style.height = 0
                return dropEl.innerHTML = ''
            }

            // Else initilize empty dropdown
            dropEl.innerHTML = ''

            // Only take number of maximum terms from list of terms
            const sliced_results = search_results.slice(0, this.MAXIMUM_ELEMENT_DISPLAY);

            // Create list item for each
            sliced_results.forEach(item => {
                const listEl = document.createElement('li');

                // Add term id to list parameter so it can be set when redirecting
                listEl.term_id = item.id;

                // Set id and redirect to term page when clicked
                listEl.addEventListener('click', goToTermPage);

                // Highlight substring matches non case sensitive result
                // https://stackoverflow.com/questions/3294576/
                let display_string = item.term_name;
                let reg = new RegExp(user_input, 'gi');
                display_string = display_string.replace(reg, function (str) { return '<b>' + str + '</b>' });
                listEl.innerHTML = display_string;

                dropEl.appendChild(listEl);
            });

            if (dropEl.children[0] === undefined) {
                return dropEl.style.height = 0
            }

            let totalChildrenHeight = dropEl.children[0].offsetHeight * sliced_results.length
            dropEl.style.height = totalChildrenHeight + 'px'

        }

        formEl.addEventListener('input', formHandler)
    }

    get template() {
        return `
        <style>
            @import 'src/components/serach-bar/search-bar.css';
        </style>
        <div class="container">
  <input id="search" type="text" placeholder="Search">
  <ul class="drop"></ul>
</div>
      `;
    }
}

customElements.define('search-bar', SearchBar);