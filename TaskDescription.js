class TaskDescription extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<style>
  /* Estilo para la barra de desplazamiento en general */
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 20px;

  }

  /* Estilo para el fondo de la barra de desplazamiento */
  ::-webkit-scrollbar-track {
    background-color: #d1d5db;
    width: 5px;

  }

  /* Estilo para el "pulgar" de la barra de desplazamiento */
  ::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
    border-radius: 20px;
    border: none;
  }

  /* Estilo para el "pulgar" de la barra de desplazamiento cuando se está arrastrando */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #4b5563;
  }

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
    border: 1px solid #9ca3af;
    margin: 10% auto;
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
    resize: none;
    /* Deshabilita el redimensionamiento manual del textarea */
    overflow-y: auto;
    /* Oculta cualquier contenido que sobresalga del textarea */
    height: 100px;
    /* Establece la altura inicial del textarea en "auto" */
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

  .blue {
    background: #2563eb;
  }

  .task-status {
    display: flex;
    outline: 1px solid #d1d5db;
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
    background-color: #e5e7eb;
  }

  .task-due{
    display: flex;
    outline: 1px solid #d1d5db;
    width: fit-content;
    color: #4b5563;
    font-size: 9px;
    font-weight: 400;
    align-items: center;
    gap: 4px;
    height: 15px;
    padding: 0px 6px 0px 6px;
    border-radius: 25px;
    flex-basis: 5%;
    background-color: #e5e7eb;
  }

  .task-done {
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

  .sub {
    display: flex;
    align-items: center;

    gap: 10px;
  }

  .task-date {
    margin-top: 1rem;
    color: #6b7280;
    font-size: x-small;
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
    .task-due {
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

    .task-date {
      color: #9ca3af;
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
    <div class="sub" style="margin-top: 1rem;">
      <div class="task-status"></div>
      <div class="task-due"></div>
    </div>
    <textarea class="description" name="" id="" rows="" placeholder="Añade descripción..."></textarea>
    <div class="task-date"></div>
  </div>
</div>`;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const closeButton = this.shadowRoot.querySelector('.close');
    closeButton.addEventListener('click', () => this.hide());
    this.taskId;

    const textarea = this.shadowRoot.querySelector('.description');

    const arrow = '\u2192';
    textarea.addEventListener("input", () => {
      textarea.value = textarea.value.replace(/->/g, arrow);
    });


  }

  connectedCallback() {

    let taskId;
    document.addEventListener('detail-message', (event) => {
      const { id, title, status, date, description, closed, completed, due } = event.detail;

      taskId = id;

      this.shadowRoot.querySelector('.modal-title').innerHTML = title;

      const textarea = this.shadowRoot.querySelector('.description');
      textarea.value = description ? description : '';

      if (status && status !== 'null') {
        this.shadowRoot.querySelector('.task-status').style.display = 'flex';
        this.shadowRoot.querySelector('.task-status').innerHTML = createPill(status);
      } else {
        this.shadowRoot.querySelector('.task-status').style.display = 'none';
      }

      if (due && due !== 'null') {
        this.shadowRoot.querySelector('.task-due').style.display = 'flex';
        this.shadowRoot.querySelector('.task-due').innerHTML = due;
      } else {
        this.shadowRoot.querySelector('.task-due').style.display = 'none';
      }

      if (completed && completed !== 'null') {
        this.shadowRoot.querySelector('.task-status').style.display = 'flex';
        this.shadowRoot.querySelector('.task-status').innerHTML = createPill('done');
      }

      let dateText = `Creada el ${date}`;

      if (closed) {
        dateText += ` - Cerrada el ${closed}  ·  ${calculateDateDifference(date, closed)} días`
      }
      this.shadowRoot.querySelector('.task-date').textContent = dateText;
      this.show();
    });


    const description = this.shadowRoot.querySelector('.description')

    const modal = this.shadowRoot.querySelector('.modal');
    this.shadowRoot.addEventListener('click', function (event) {
      if (!event.target.closest('.modal-content')) {
        updateDescription(taskId, description.value);
        modal.style.display = 'none';
      }
    });
  }

  show() {
    this.shadowRoot.querySelector('.modal').style.display = 'block';
  }

  hide() {
    this.shadowRoot.querySelector('.modal').style.display = 'none';
  }

}

customElements.define('task-description', TaskDescription);

function updateDescription(id, value) {
  editDescription(id, value)
}

function createPill(value) {
  if (value === 'pending') {
    return `<div class="point yellow"></div>
    <div class="task-status-desc">Pending</div>`;
  }
  if (value === 'stopped') {
    return `<div class="point red"></div>
    <div class="task-status-desc">Stopped</div>`;
  }
  if (value === 'progress') {
    return `<div class="point green"></div>
    <div class="task-status-desc">Progress</div>`;
  }

  if (value === 'done') {
    return `<svg width="15" height="15" viewBox="0 0 15 15" fill="#16a34a" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="#16a34a" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <div class="task-status-desc">Finalizada</div>`;
  }
  if (value === 'planned') {
    return `<div class="point blue"></div>
        <div class="task-status-desc">Planned</div>`;
  }

}

function calculateDateDifference(date1, date2) {
  // Convert the input dates to Date objects
  const startDate = new Date(date1.split("/").reverse().join("-"));
  const endDate = new Date(date2.split("/").reverse().join("-"));

  // Convert the dates to milliseconds
  const startDateMs = startDate.getTime();
  const endDateMs = endDate.getTime();

  // Calculate the difference in milliseconds
  const dateDifferenceMs = endDateMs - startDateMs;

  // Convert the difference to days
  const days = Math.round(dateDifferenceMs / 86400000);

  return days;
}