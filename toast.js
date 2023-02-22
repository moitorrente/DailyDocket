class ToastComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        .toast {
            position: fixed;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
            max-width: 450px;
            width: 100%; /* Esto hace que el div ocupe todo el ancho horizontal disponible */
            text-align: center;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: slide-up .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    
        @keyframes slide-up {
            0% {
                transform: translate(-50%, -100%);
            }
            100% {
                transform: translate(-50%, 0);
            }
        }
    
        .toast_message {
            background-color: #e5e7eb;
            border-radius: 10px;
            color: #6b7280;
            padding: 8px;
            padding-right: 12px;
            padding-left: 12px;
            align-items: center;
            display: flex;
            gap: 10px;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
        }
    
        .toast_text {
            font-size: small;
        }
    
        .toast_close {
            cursor: pointer;
            color: #9ca3af;
            padding: 2px;
            border-radius: 5px;
            transition: background-color .4s ease, color .4s ease;
        }

        .toast_close:hover {
            color: #6b7280;
            background-color: #d1d5db;
          }
    
        .hidden {
            animation: slide-down .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    
        .hide {
            display: none;
        }
    
        @keyframes slide-down {
            0% {
                transform: translate(-50%, 0);
            }
            100% {
                transform: translate(-50%, -100%);
            }
        }
        </style>
        <div class="toast hidden hide">
          <div class="toast_message">
            <span class="toast_text"></span>
            <svg class="toast_close" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
        </div>
      `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.toastEl = this.shadowRoot.querySelector('.toast');
        this.textEl = this.shadowRoot.querySelector('.toast_text');
        this.closeEl = this.shadowRoot.querySelector('.toast_close');

        this.closeEl.addEventListener('click', () => {
            this.hide();
        });
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text' && newValue !== '') {
            this.textEl.textContent = newValue;
            this.show();
        }
    }

    show() {
        this.toastEl.classList.remove('hidden', 'hide');
        this.toastEl.addEventListener('mouseover', () => {
            clearTimeout(this.timeout);
        });
        this.timeout = setTimeout(() => {
            this.hide();
        }, 3500);
    }

    hide() {
        this.toastEl.classList.add('hidden');
        setTimeout(() => {
            this.toastEl.classList.add('hide');
        }, 500);
    }

    connectedCallback() {
        document.addEventListener('toast-message', (event) => {
            this.setAttribute('text', event.detail);
        });

        this.toastEl.addEventListener('mouseover', () => {
            clearTimeout(this.timeout);
        });

        this.toastEl.addEventListener('mouseleave', () => {
            this.timeout = setTimeout(() => {
                this.hide();
            }, 3500);
        });
    }
}

customElements.define('toast-component', ToastComponent);
