// Define the web component element
class MyCounter extends HTMLElement {
  static get observedAttributes() {
    return ['show'];
  }
  constructor() {
    super();

    // Create the shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Create the HTML structure as a string
    const template = `<style>
  .container {

    width: 210px;
    height: 40px;
    background-color: #f3f4f6;
    color: #6b7280;
    border-radius: 9px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 3px;
    gap: 3px;
  }

  .increment,
  .decrement {
    flex-grow: 1;
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

  button:hover {
    background-color: #e5e7eb;
    color: #4b5563;
  }

  input {
    border: 0;
    font-family: 'Roboto Mono', monospace;
    background-color: transparent;
    border-radius: 7px;
    max-width: 70px;
    text-align: center;
    outline: none;
    padding: 3px;
    font-size: 22px;
    color: #6b7280;
    transition: background-color .3s ease, color .3s ease;
  }

  input:hover {
    background-color: #e5e7eb;
    color: #374151;
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

    input {
      color: #d1d5db;
    }

    input:hover {
      background-color: #4b5563;
      color: #e5e7eb;
    }

  }
</style>
<div class="container hidden">
  <button class="decrement">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </button>
  <input type="text" class="value" value="0" disabled>
  <button class="increment">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </button>

  <button class="reset">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </button>
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

    // Get the value element and buttons

  }

  connectedCallback() {
    this.container = this.shadowRoot.querySelector(".container");
    this.valueEl = this.shadowRoot.querySelector(".value");
    this.decrementBtn = this.shadowRoot.querySelector(".decrement");
    this.incrementBtn = this.shadowRoot.querySelector(".increment");
    this.resetBtn = this.shadowRoot.querySelector(".reset");
    this.stopBtn = this.shadowRoot.querySelector('.close');
    // Add event listeners to the buttons
    this.decrementBtn.addEventListener("click", this.decrement.bind(this));
    this.incrementBtn.addEventListener("click", this.increment.bind(this));
    this.resetBtn.addEventListener("click", this.reset.bind(this));
    this.stopBtn.addEventListener('click', this.hide.bind(this));

  }

  // Decrement the value
  decrement() {
    let value = parseInt(this.valueEl.value);
    value--;
    this.valueEl.value = value;
  }

  // Increment the value
  increment() {
    let value = parseInt(this.valueEl.value);
    value++;
    this.valueEl.value = value;
  }

  // Reset the value
  reset() {
    this.valueEl.value = "0";
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      this.show();
    }
  }

  hide() {
    this.container.classList.add("hidden");
  }

  show() {
    this.container.classList.remove("hidden");
  }
}

// Define the web component
customElements.define("my-counter", MyCounter);
