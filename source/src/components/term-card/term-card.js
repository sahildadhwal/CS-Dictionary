class TermCard extends HTMLElement {
    constructor() {
        super();
        let shadowEl = this.attachShadow({ mode: 'open' });
        let articleEl = document.createElement('article');
        let styleEl = document.createElement('style');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'src/components/term-card/term-card.css', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return;
            styleEl.textContent = this.responseText; //style
        };
        xhr.send();


        shadowEl.appendChild(styleEl);
        shadowEl.appendChild(articleEl);

    }

    set data(data) {
        if (!data) return;
        let articleElement = this.shadowRoot.querySelector('article');
        if (articleElement === null) {
            console.log('it is returning EMPTY');
            return;
        }

        articleElement.innerHTML = `
        <div class="basic-card basic-card-light">
        <div class="card-content">
          <span id="term-name" class="card-title">${data['term_name']}</span>
          <p id="description" class="card-text">
            ${data['short_description']}
          </p>
        </div>
    
        <div class="card-link" id="Hello">
          <a href="./term-page.html" id="open_term"><span>Open</span></a>
        </div>
      </div>
        `;
      
      let openTermButton = articleElement.querySelector('#open_term');
      openTermButton.addEventListener('click', e => {
        localStorage.setItem('get_term_id', data['id']);
      })
    }
}

customElements.define("term-card", TermCard);