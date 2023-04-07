class DatePicker extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    this.taskId;
    template.innerHTML = `<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    color: #4b5563;
    display: none;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }

  .modal-title {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .close {
    align-items: center;
    align-self: baseline;
    border-radius: 4px;
    color: #aaa;
    cursor: pointer;
    display: flex;
    height: 16px;
    justify-content: center;
    padding: 3px;
    width: 16px;
  }

  .close:hover,
  .close:focus {
    background-color: #e5e7eb;
    color: #6b7280;
    cursor: pointer;
    text-decoration: none;
  }

  .modal-content {
    background-color: #f9fafb;
    border: 1px solid #9ca3af;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 380px;
    margin: 10vh auto;
    max-width: 280px;
    padding: 20px;
  }

  .modal-title-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-body {
    display: flex;
    font-size: 16px;
    justify-content: center;
    line-height: 1.5;
    margin: auto;
    max-height: 30vh;
    overflow: auto;
  }

  input {
    background-color: white;
    border: 1px solid #9ca3af;
    border-radius: 6px;
    color: #6b7280;
    margin-bottom: 10px;
    padding: 5px;
    width: 95%;
  }

  input::-webkit-calendar-picker-indicator {
    display: none;
  }

  input::-moz-calendar-picker-indicator {
    display: none;
  }

  input::-ms-clear {
    display: none;
  }

  input:hover {
    outline: 0;
    border: 1px solid #6b7280;
  }

  input:focus {
    outline: 0;
    border: 1px solid #4b5563;
  }

  button {
    background-color: #6b7280;
    border: 1px solid #9ca3af;
    border-radius: 5px;
    color: #f3f4f6;
    margin-top: 10px;
    padding: 6px;
  }

  button:hover {
    background-color: #3f3f46;
    cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    .modal-content {
      background-color: #111827;
    }

    .close:hover,
    .close:focus {
      background-color: #374151;
      color: #d1d5db;
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

    .date:hover {
      background-color: #374151;
      color: #e5e7eb;
    }

    .remove-date:hover {
      background-color: #374151;
      color: #ef4444;
    }

    button {
      background-color: #374151;
      border: 1px solid #4b5563;
      color: #f3f4f6;
    }

    button:hover {
      background-color: #4b5563;
    }

    input {
      background-color: #374151;
      border: 1px solid #6b7280;
      color: #e5e7eb;
    }
  }
</style>

<div class="modal">
  <div class="modal-content">
    <div class="modal-title-container">
      <div class="modal-title">Selecciona una fecha</div>
      <div class="close">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
    <div class="secondary-title" style="font-size: 12px;">
      Fecha de finalización
    </div>
    <input type="date" name="" id="date-picker-text">
    <custom-calendar></custom-calendar>
    <button class="select" style="width: 100%;">Seleccionar fecha</button>
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
    document.addEventListener('keydown', this.handleKeyDown);

    document.addEventListener('date-selected', (event) => {
      this.shadowRoot.querySelector('input').value = event.detail;
      taskEditDue(this.taskid, formatDate(event.detail));
      const eventClose = new CustomEvent('close-task-due', {});
      document.dispatchEvent(eventClose);
      this.remove();

    });

    // document.addEventListener('keydown', (event) => {
    //     if (event.key === 'Escape') {
    //         // Se ha pulsado la tecla "Escape"
    //         this.remove();
    //     }
    // });


    const datepickerText = this.shadowRoot.querySelector('#date-picker-text');
    const selectButton = this.shadowRoot.querySelector('.select');
    selectButton.addEventListener('click', () => {
      if (!datepickerText.value) {
        const event = new CustomEvent('toast-message', {
          detail: 'Fecha no válida'
        });
        document.dispatchEvent(event);
      } else {
        const partes = datepickerText.value.split('-');
        const fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;
        taskEditDue(this.taskid, fecha);
        const eventClose = new CustomEvent('close-task-due', {});
        document.dispatchEvent(eventClose);
        this.remove();

      }
    })

    document.addEventListener('launch-datepicker', (event) => {
      this.taskid = event.detail.id;
      this.shadowRoot.querySelector('.modal').style.display = 'flex';
    });

    const _this = this;

    const modal = this.shadowRoot.querySelector('.modal');
    this.shadowRoot.addEventListener('click', function (event) {
      if (!event.target.closest('.modal-content')) {
        _this.remove();
      }
    });
  }
}
customElements.define('date-picker', DatePicker);


function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  return `${day}/${month}/${year}`;
}