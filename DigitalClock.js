class DigitalClock extends HTMLElement {
    constructor() {
        super();
        this.intervalID = null;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const template = `<style>
  .container {
    font-family: 'Roboto Mono', monospace;
    width: 100%;
    margin-top: 10px;
    background-color: #f3f4f6;
    color: #6b7280;
    font-weight: bold;
    font-size: 22px;
    border-radius: 9px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3px;
    padding: 3px;
    text-align: center;
  }

  .close{
    margin-left: auto;
  }

  button {
    align-items: center;
    background-color: #f3f4f6;
    color: #6b7280;
    border: none;
    font-size: 6px;
    padding: 5px;
    border-radius: 7px;
    cursor: pointer;
    transition: background-color .3s ease;
  }

   .display {
    flex-grow: 1;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background-color: #e5e7eb;
    color: #4b5563;
  }

  .hidden {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #374151;
      color: #f3f4f6;
    }

    button {
      background-color: #374151;
      color: #9ca3af;
      transition: background-color .3s ease;
    }

    button:hover {
      background-color: #4b5563;
      color: #e5e7eb;
    }
  }
</style>
<div class="container">
  <div class="display"></div>
  <button class="close">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </button>
</div>`;


        // Add the HTML elements to the shadow DOM
        shadowRoot.innerHTML = template;
    }

    connectedCallback() {
        this.container = this.shadowRoot.querySelector(".display");
        this.close = this.shadowRoot.querySelector(".close");
        this.close.addEventListener('click', () => {
            this.remove();
        });
        this.updateClock();
        this.intervalID = setInterval(() => {
            this.updateClock();
        }, 1000);
    }


    disconnectedCallback() {
        clearInterval(this.intervalID);
    }

    updateClock() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        this.container.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define('digital-clock', DigitalClock);