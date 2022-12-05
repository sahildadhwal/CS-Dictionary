class TermCard extends HTMLElement {
  constructor() {
    super();
    let shadow_el = this.attachShadow({ mode: 'open' });
    let article_el = document.createElement('article');
    shadow_el.appendChild(article_el);
  }

  set data(data) {
    if (!data) return;
    let article_element = this.shadowRoot.querySelector('article');
    if (article_element === null) {
      return;
    }

    article_element.innerHTML = `
    <style>
      @import 'src/components/term-card/term-card.css';
    </style>
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

    let open_term_button = article_element.querySelector('#open_term');
    open_term_button.addEventListener('click', (e) => {
      localStorage.setItem('get_term_id', data['id']);
    });
  }
}

customElements.define('term-card', TermCard);
