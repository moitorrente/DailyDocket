class MyDate extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = `
        <style>
          div {
            color: #6b7280; font-weight: 400; font-size: large;;
          }
        </style>
        <div>
          <span></span>
        </div>
      `;

        shadowRoot.innerHTML = template;
    }

    connectedCallback() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleDateString('es-ES', options).replace(/ de /g, ' ');;
        this.shadowRoot.querySelector('span').textContent = date;
    }
}

customElements.define('my-date', MyDate);