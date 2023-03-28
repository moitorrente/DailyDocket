class TaskList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = `<style>
  :host {
    --bg-color: #f8fafc;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    box-sizing: border-box;
  }
  

  .task {
    display: flex;
    align-items: center;
    gap: .5rem;
    border-radius: 10px;
    padding: 0 .5rem 0 .5rem;
    transition: background-color 0.4s ease;
    background-color: var(--bg-color);
    position: relative;
  }

  .task::before {
    content: "";
    position: absolute;
    left: 5%;
    top: -1px;
    bottom: 0px;
    height: 1px;
    width: 90%;
    z-index: 9;
    /* or 100px */
    border-bottom: 1px solid var(--gray-100);
  }

  /* estilos para el texto */
  .task-text {
    color: var(--gray-500);
    flex-basis: 90%;
    /* flex-grow: 1; */
    font-size: medium;
    /* box-shadow: inset 0px 1px 0px var(--gray-100); */
    padding: .5rem 0 .5rem 0;
    word-wrap: break-word;
    width: 100%;
  }

  /* estilos para la fecha */
  .task-date {
    opacity: 0;
    font-size: xx-small;
    color: var(--gray-500);
    width: fit-content;
    white-space: nowrap;
    transition: opacity 0.4s ease;
    flex-basis: 10%;
    display: none;
  }

  .task:hover {
    background-color: var(--gray-100);
  }

  .task:hover .task-date {
    opacity: 1;
    display: flex;
  }



  input[type="checkbox"] {
    display: none;
    /* ocultar el checkbox real */
  }

  /* estilo del label que lo sustituye */
  label[for="myCheckbox"] {
    display: inline-block;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-color: var(--gray-50);
    border-radius: 5px;
    vertical-align: middle;
    border: 1px solid var(--gray-300);
    box-shadow: 0px 1px 2px rgb(0 0 0 / 10%);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    background-size: cover;
    transition: border 0.2s ease;
  }

  label[for="myCheckbox"]:hover {
    border: 1px solid var(--gray-400);
  }

  input[type="checkbox"]:checked+label {
    background-color: var(--gray-400);
    border: 1px solid var(--gray-400);
    background-image: url("check.svg");
  }

  input[type="checkbox"]:checked:hover+label {
    border: 1px solid var(--gray-500);
    background-image: url("check.svg");
  }



  .task-status {
    display: flex;
    justify-content: center;
    outline: 1px solid var(--gray-200);
    color: var(--gray-400);
    font-size: 9px;
    font-weight: 400;
    align-items: center;
    gap: 4px;
    height: 15px;
    padding: 0px 6px 1px 4px;
    flex-shrink: 0;
    border-radius: 25px;
    flex-basis: 5%;
    background-color: var(--bg-color);
  }

  .task-status-desc {
    height: 10px;
    line-height: 10px;
    display: flex;
    align-items: center;
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

  @media (prefers-color-scheme: dark) {
    :host {
      --bg-color: #f8fafc;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
    }

    .task::before {
      border-bottom: 1px solid var(--gray-800);
    }

    .task {
      background-color: var(--gray-900);
    }

    .task:hover {
      background-color: var(--gray-800);
    }

    .task::before:hover {
      border-bottom: 1px solid blue;
    }

    .task-text {
      /* box-shadow: inset 0px 1px 0px var(--gray-800); */
      color: var(--gray-100);
    }

    .task-date {
      color: var(--gray-100);
    }

    .task-status {
      outline: 1px solid var(--gray-700);
      color: var(--gray-400);
      background-color: var(--gray-800);
    }

    input[type="checkbox"]+label {
      background-color: var(--gray-600);
      border: 1px solid var(--gray-600);
    }

    input[type="checkbox"]:checked+label {
      background-color: var(--gray-600);
      border: 1px solid var(--gray-600);
    }

    input[type="checkbox"]:checked:hover+label {
      border: 1px solid var(--gray-500);
    }
  }
</style>

<div class="task" id="">
  <input type="checkbox" id="myCheckbox">
  <label for="myCheckbox"></label>
  <div class="task-text">
    <slot name="title"></slot>
  </div>
  <slot name="status" style="display: none"></slot>
  <slot name="due" style="display: none"></slot>
  <div class="task-date">
  <slot name="date"></slot>
</div>
  <div name="status" style="display: none" class="task-status"></div>
  <!-- <div class="task-status">
    <slot name="status"></slot>
    <div class="point"></div>
    <div class="task-status-desc">Pending</div>
  </div> -->

</div>`;
    shadowRoot.innerHTML = template;

    // const task = shadowRoot.querySelector('.task');
    // task.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   if (!e.target.matches('#myCheckbox')) {
    //     const event = new CustomEvent('modal-message', {
    //       detail: {
    //         id: this.taskId,
    //         title: this.taskTitle,
    //         status: this.statusContainer ? this.statusContainer : '',
    //         date: this.taskDate
    //       }
    //     });
    //     document.dispatchEvent(event);
    //   }
    // })

    const checkbox = shadowRoot.querySelector("input[type='checkbox']");

    // Escuchar los cambios en el estado del checkbox
    checkbox.addEventListener('click', (event) => {
      const { taskTitle, taskRaw, taskText, taskDate, taskId } = this;
      if (checkbox.checked) {
        removeOpenTask(taskId);
        addClosedTask(taskTitle, taskRaw, taskText, taskDate, taskId);
        saveTasksToLocalStorage();
      } else {
        removeClosedTask(taskId);
        addOpenTask(taskTitle, taskRaw, taskText, taskDate, taskId);
        saveTasksToLocalStorage();
      }
    })




  }
  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot[name="title"]');
    const assignedNodes = slot.assignedNodes();
    this.taskTitle = assignedNodes[0].outerHTML;
    const slotDate = this.shadowRoot.querySelector('slot[name="date"]');
    const assignedNodesDate = slotDate.assignedNodes();
    this.taskDate = assignedNodesDate[0].textContent;
    this.taskId = Number(this.getAttribute("id"));
    this.taskRaw = this.getAttribute("raw");
    this.taskText = this.getAttribute("text");

    const slotStatus = this.shadowRoot.querySelector('slot[name="status"]');
    const assignedNodesStatus = slotStatus.assignedNodes()[0]?.textContent;
    this.taskStatus = assignedNodesStatus;
    this.statusContainer;

    const slotDue = this.shadowRoot.querySelector('slot[name="due"]');
    const assignedNodesDue = slotDue.assignedNodes()[0]?.textContent;
    this.taskDue = assignedNodesDue;

    const contenedor = this.shadowRoot.querySelector('div[name="status"]');

    if (this.taskStatus === 'pending') {
      contenedor.style.display = 'flex';
      contenedor.innerHTML = `<div class="point yellow"></div>
      <div class="task-status-desc">Pending</div>`;
      this.statusContainer = contenedor.innerHTML;

    }
    if (this.taskStatus === 'stopped') {
      contenedor.style.display = 'flex';
      contenedor.innerHTML = `<div class="point red"></div>
      <div class="task-status-desc">Stopped</div>`;
      this.statusContainer = contenedor.innerHTML;

    }
    if (this.taskStatus === 'progress') {
      contenedor.style.display = 'flex';
      contenedor.innerHTML = `<div class="point green"></div>
      <div class="task-status-desc">Progress</div>`;
      this.statusContainer = contenedor.innerHTML;
    }
    if (this.taskStatus === 'planned') {
      contenedor.style.display = 'flex';
      contenedor.innerHTML = `<div class="point blue"></div>
      <div class="task-status-desc">Planned</div>`;
      this.statusContainer = contenedor.innerHTML;
    }

    if (this.taskDue !== 'undefined' && this.taskDue) {
      contenedor.style.display = 'flex';
      const { texto, dias } = calculateDateDifferenceText(new Date().toLocaleDateString('es-ES'), this.taskDue);
      contenedor.innerHTML += `<popup-info img="" data-number-days="${dias}" data-task-id="${this.taskId}" data-text="Fecha planificada: ${this.taskDue}<div class='due-translated'>${texto}</div>"></popup-info>`;
    }
  }
}

customElements.define("task-list", TaskList);

function calculateDateDifferenceText(date1, date2) {
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

  if (days > 365) {
    return {
      texto: `Dentro de más de un año`,
      dias: days
    };
  }

  if (days > 30 * 11) {
    return {
      texto: `Dentro de once meses`,
      dias: days
    };
  }

  if (days > 30 * 10) {
    return {
      texto: `Dentro de diez meses`,
      dias: days
    };
  }

  if (days > 30 * 9) {
    return {
      texto: `Dentro de nueve meses`,
      dias: days
    };
  }

  if (days > 30 * 8) {
    return {
      texto: `Dentro de ocho meses`,
      dias: days
    };
  }

  if (days > 30 * 7) {
    return {
      texto: `Dentro de siete meses`,
      dias: days
    };
  }

  if (days > 30 * 6) {
    return {
      texto: `Dentro de seis meses`,
      dias: days
    };
  }

  if (days > 30 * 5) {
    return {
      texto: `Dentro de cinco meses`,
      dias: days
    };
  }

  if (days > 30 * 4) {
    return {
      texto: `Dentro de cuatro meses`,
      dias: days
    };
  }

  if (days > 30 * 3) {
    return {
      texto: `Dentro de tres meses`,
      dias: days
    };
  }

  if (days > 30 * 2) {
    return {
      texto: `Dentro de dos meses`,
      dias: days
    };
  }

  if (days > 31) {
    return {
      texto: `Dentro de más de un mes`,
      dias: days
    };
  }

  if (days > 1) {
    return {
      texto: `Dentro de ${days} días`,
      dias: days
    };
  }

  if (days === 1) {
    return {
      texto: `Mañana`,
      dias: days
    };
  }

  if (days === 0) {
    return {
      texto: `Hoy`,
      dias: days
    };
  }

  if (days === -1) {
    return {
      texto: `Ayer`,
      dias: days
    };
  }

  if (days < -1 && days > -31) {
    return {
      texto: `Hace ${-days} días`,
      dias: days
    };
  }

  return {
    texto: `Hace de más de un mes`,
    dias: days
  };
}
