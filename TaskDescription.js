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
        this.shadowRoot.querySelector('.task-due').innerHTML = `<svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> ${due}`;
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