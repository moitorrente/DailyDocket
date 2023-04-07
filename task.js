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
    border-radius: 5px;
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

    .task-priority {
      color: var(--gray-200);
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
  <div name="priority" class="task-priority" style="visibility: hidden"></div>
  <slot name="priority" style="display: none"></slot>
  <div class="task-text">
    <slot name="title"></slot>
  </div>
  <slot name="status" style="display: none"></slot>
  <slot name="due" style="display: none"></slot>
  <slot name="description" style="display: none"></slot>
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
      // const { taskId } = this;
      changeStateTask(this.taskId);
      saveTasksToLocalStorage();
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

    const slotPriority = this.shadowRoot.querySelector('slot[name="priority"]');
    const assignedNodesPriority = slotPriority.assignedNodes()[0]?.textContent;
    this.taskPriority = assignedNodesPriority;




    const slotDue = this.shadowRoot.querySelector('slot[name="due"]');
    const assignedNodesDue = slotDue.assignedNodes()[0]?.textContent;
    this.taskDue = assignedNodesDue;
    const slotDescription = this.shadowRoot.querySelector('slot[name="description"]');
    const assignedNodesDescription = slotDescription.assignedNodes()[0]?.textContent;
    this.taskDescription = assignedNodesDescription;

    const contenedor = this.shadowRoot.querySelector('div[name="status"]');
    const contenedorPriority = this.shadowRoot.querySelector('div[name="priority"]');

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
      const icon = `<svg width='10' height='10' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z' fill='currentColor' fill-rule='evenodd' clip-rule='evenodd'></path></svg>`;
      contenedor.innerHTML += `<popup-info data-icon="${icon}" data-type="date" data-number-days="${dias}" data-task-id="${this.taskId}" data-text="Fecha planificada: ${this.taskDue}<div class='due-translated'>${texto}</div>"></popup-info>`;
    }

    let priorityIcon = `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
    <path stroke-linecap='round' stroke-linejoin='round' d='M3.75 9h16.5m-16.5 6.75h16.5' />
  </svg>`;

    if (this.taskPriority === 'null' || this.taskPriority === 'undefined') {
      contenedorPriority.style.visibility = 'hidden';
      contenedorPriority.style.display = 'none';
      contenedorPriority.style.width = '12px';
      contenedorPriority.style.flexShrink = '0';
    } else {

      if (this.taskPriority === 'blocker') {
        contenedorPriority.style.visibility = 'visible';


        priorityIcon = `<svg width='12' height='12' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='#facc15' class='w-6 h-6'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
      </svg>
      `;
      }
      if (this.taskPriority === 'high') {
        contenedorPriority.style.visibility = 'visible';
        contenedorPriority.style.width = '12px';

        priorityIcon = `<svg width='12' height='12' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='#ef4444' class='w-6 h-6'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5' />
      </svg>
      `

      }
      if (this.taskPriority === 'medium') {
        contenedorPriority.style.visibility = 'visible';
        contenedorPriority.style.width = '12px';

        priorityIcon = `<svg width='12' height='12' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='#16a34a' class='w-6 h-6'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M3.75 9h16.5m-16.5 6.75h16.5' />
      </svg>
      `
      }
      if (this.taskPriority === 'low') {
        contenedorPriority.style.visibility = 'visible';
        contenedorPriority.style.width = '12px';

        priorityIcon = `<svg width='12' height='12' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='#2563eb' class='w-6 h-6'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5' />
      </svg>
      `
      }

      contenedorPriority.innerHTML += `<popup-info data-icon="${priorityIcon}" data-number-days="2" data-text="Prioridad: ${this.taskPriority}"></popup-info>`
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
