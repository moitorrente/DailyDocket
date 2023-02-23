class Modal extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
          .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.4);
          }
  
          .modal-content {
            background-color: #f3f4f6;
            margin: 20% auto;
            padding: 20px;
            border-radius: 10px;
            width: 80%;
            max-width: 550px;
          }
  
          .close {
            color: #aaa;
            cursor: pointer;
            padding: 3px;
            border-radius: 4px;
            width: 21px;
            height: 21px;
          }
  
          .close:hover,
          .close:focus {
            color: black;
            background-color: #d1d5db;
            text-decoration: none;
            cursor: pointer;
          }
  
          .modal-title {
            flex-grow: 1;
            font-size: x-large;
          }

          .modal-title-2 {
            display: flex;
            align-items: center;
          }
  
          .modal-body {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
            margin: auto;
            overflow: auto;
            max-height: 40vh;
            display: flex;
            justify-content: center;
          }
        </style>
        <div class="modal">
          <div class="modal-content">
            <div class="modal-title-2">
            <div class="modal-title"></div>
            <div class="close"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>
            
            </div>

            <p class="modal-body"></p>
          </div>
        </div>
      `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const closeButton = this.shadowRoot.querySelector('.close');
        closeButton.addEventListener('click', () => this.hide());
    }

    connectedCallback() {
        // const title = this.getAttribute('title');
        // const body = this.getAttribute('body');
        // this.shadowRoot.querySelector('.modal-title').textContent = title;
        // this.shadowRoot.querySelector('.modal-body').textContent = body;

        document.addEventListener('modal-message', (event) => {
            let [title, body] = event.detail;
            this.shadowRoot.querySelector('.modal-title').textContent = title;
            this.shadowRoot.querySelector('.modal-body').innerHTML = body;
            this.show();
        });
    }

    show() {
        this.shadowRoot.querySelector('.modal').style.display = 'block';
    }

    hide() {
        this.shadowRoot.querySelector('.modal').style.display = 'none';
    }
}

customElements.define('modal-component', Modal);
