class CalendarView extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        this.taskId;
        template.innerHTML = `<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    color: #4b5563;

  }

  .modal-title {
    font-size: 14px;
    margin-bottom: 10px;
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

  .modal-content {
    background-color: #f9fafb;
    margin: 10vh auto;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #9ca3af;
    /* width: 80%; */
    height: 280px;
    gap: 10px;
    max-width: 280px;
    display: flex;
    flex-direction: column;
  }


  .modal-title-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-body {
    font-size: 16px;
    line-height: 1.5;
    margin: auto;
    overflow: auto;
    max-height: 30vh;
    display: flex;
    justify-content: center;
  }



  @media (prefers-color-scheme: dark) {
    .modal-content {
      background-color: #111827;
    }



    .close:hover,
    .close:focus {
      color: #d1d5db;
      background-color: #374151;
    }

    .modal-title-container {
      border-bottom: 1px solid #374151;

    }

    .modal-title {
      color: #d1d5db;
    }

    .secondary-title {
      color: #d1d5db;
    }

  }
</style>

<div class="modal">
  <div class="modal-content">
    <div class="modal-title-container">
      <div class="modal-title">Calendario</div>
      <div class="close">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
    <custom-calendar></custom-calendar>
  </div>
</div>`;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const closeButton = this.shadowRoot.querySelector('.close');
        closeButton.addEventListener('click', () => this.remove());

        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') this.remove();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.modal').style.display = 'flex';
        document.addEventListener('keydown', this.handleKeyDown);

        document.addEventListener('date-selected', (event) => {
            this.remove();
        });

        const _this = this;

        this.shadowRoot.addEventListener('click', function (event) {
            if (!event.target.closest('.modal-content')) {
                _this.remove();
            }
        });
    }
}
customElements.define('calendar-view', CalendarView);
