class Modal extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #f3f4f6;
    margin: 10% auto;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #9ca3af;
    width: 80%;
    max-width: 550px;
  }

  .close {
    color: #aaa;
    cursor: pointer;
    padding: 3px;
    border-radius: 4px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: baseline;
  }

  .close:hover,
  .close:focus {
    color: #6b7280;
    background-color: #e5e7eb;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-title {
    flex-grow: 1;
    font-size: medium;
    font-weight: 500;
    color: #6b7280;
  }

  .modal-title-container {
    display: flex;
    align-items: center;
  }

  .description {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border-radius: 4px;
    margin-top: 1rem;
    color: #6b7280;
    background-color: #f3f4f6;
    padding: 10px;
    border: 0;
    width: 96%;
  }

  .description:focus {
    outline: 1px solid #cbd5e1;
  }

  .point {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 50%;
  }

  .yellow {
    background: #facc15;
  }

  .green {
    background: #16a34a;
  }

  .red {
    background: #ef4444;  
  }

  .task-status {
    display: flex;
    outline: 1px solid #e5e7eb;
    width: fit-content;
    color: #4b5563;
    font-size: 9px;
    font-weight: 400;
    align-items: center;
    gap: 4px;
    height: 15px;
    padding: 0px 6px 0px 4px;
    border-radius: 25px;
    flex-basis: 5%;
    background-color: #f3f4f6;
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





  @media (prefers-color-scheme: dark) {
    .modal-content {
      background-color: #111827;
      border: 1px solid #4b5563;
    }

    .task-status {
      outline: 1px solid #374151;
      color: #9ca3af;
      background-color: #1f2937;
    }

    .close:hover,
    .close:focus {
      color: #d1d5db;
      background-color: #374151;
    }

    .modal-title {
      color: #e5e7eb;
    }

    .description {
      color: #d1d5db;
      background-color: #111827;
    }

    .description:focus {
      outline: 1px solid #475569;
    }

  }
</style>
<div class="modal">
  <div class="modal-content">
    <div class="modal-title-container">
      <div class="modal-title"></div>
      <div class="close"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg></div>

    </div>
    <div class="task-status" style="margin-top: 1rem;"></div>
    <p class="modal-body"></p>
    <textarea class="description" name="" id="" rows="10"></textarea>
  </div>
</div>`;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const closeButton = this.shadowRoot.querySelector('.close');
    closeButton.addEventListener('click', () => this.hide());

    const modal = this.shadowRoot.querySelector('.modal');
    this.shadowRoot.addEventListener('click', function (event) {
      if (!event.target.closest('.modal-content')) {
        modal.style.display = 'none'
      }
    });
  }

  connectedCallback() {
    // const title = this.getAttribute('title');
    // const body = this.getAttribute('body');
    // this.shadowRoot.querySelector('.modal-title').textContent = title;
    // this.shadowRoot.querySelector('.modal-body').textContent = body;

    document.addEventListener('modal-message', (event) => {
      const { title, status } = event.detail;
      console.log(title, status)

      this.shadowRoot.querySelector('.modal-title').innerHTML = title;
      this.shadowRoot.querySelector('.task-status').innerHTML = status;
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
