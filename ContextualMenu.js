class ContextualMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lastTaskClicked = null;
    this.shadowRoot.innerHTML = `<style>
  .menu {
    width: 150px;
    display: none;
    position: absolute;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    font-size: medium;
    padding: 2px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
  }

  .menu-list {
    margin: 0;
    display: block;
    padding: 4px;
  }

  .menu-list+.menu-list {
    border-top: 1px solid #9ca3af;
  }

  .menu-sub-list {
    display: none;
    padding: 8px;
    background-color: #f9fafb;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
    position: absolute;
    left: 100%;
    right: 0;
    z-index: 100;
    width: 100%;
    top: 0;
    flex-direction: column;
  }

  .menu-sub-list:hover {
    display: flex;
  }

  .menu-item {
    position: relative;
    list-style: none;
  }

  .menu-button {
    font: inherit;
    border: 0;
    padding: 8px 6px;
    padding-right: 36px;
    width: 100%;
    border-radius: 8px;
    text-align: left;
    display: flex;
    align-items: center;
    position: relative;
    color: #374151;
    background-color: #f9fafb;

  }

  .menu-button:hover {
    background-color: #e5e7eb;
    cursor: pointer;
  }

  .menu-button:hover+.menu-sub-list {
    display: flex;
  }

  .menu-button svg {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  .menu-button svg:nth-of-type(2) {
    margin-right: 0;
    position: absolute;
    right: 8px;
  }

  .menu-button--delete:hover {
    color: #ef4444;
  }

  .menu-button--yellow svg {
    fill: #facc15;
    stroke: #facc15;
  }

  .menu-button--green svg:first-of-type {
    stroke: #16a34a;
    fill: #16a34a;
  }

  .menu-button--red svg:first-of-type {
    stroke: #ef4444;
    fill: #ef4444;
  }

  .menu-button--white svg:first-of-type {
    stroke: #f9fafb;
    fill: #f9fafb;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (prefers-color-scheme: dark) {

    .menu {
      background-color: #1f2937;
      opacity: .97;
      border: 1px solid #4b5563;
    }

    .menu-sub-list {
      background-color: #1f2937;
    }

    .menu-button {
      color: #9ca3af;
      background-color: #1f2937;

    }

    .menu-button:hover {
      background-color: #374151;
      color: #f9fafb;
      cursor: pointer;
    }

  }

  /* #custom-menu {
      background-color: #1f2937;
      opacity: .97;
      border: 1px solid #4b5563;
    }

    a {
      color: #9ca3af;
    }

    #custom-menu a:hover {
      background-color: #374151;
      color: #f9fafb;
    }

    #custom-menu a:hover svg {
      color: #f9fafb;
    } */
</style>

<div id="custom-menu" class="menu">
  <ul class="menu-list">
    <li class="menu-item"><button data-action="edit" class="menu-button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Editar</button></li>
    <li class="menu-item"><button data-action="description" class="menu-button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Descripción</button></li>
    <li class="menu-item"><button data-action="copy" class="menu-button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Copiar</button></li>
  </ul>
  <ul class="menu-list">
    <li class="menu-item"><button class="submenu menu-button menu-button--black">
        <div style="display: flex; align-items: center; width: 100%;">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
          <div style="flex-grow: 1;">Status</div>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </div>

      </button>
      <ul class="menu-sub-list">
        <li class="menu-item"><button data-action="status" data-status="pending"
            class="menu-button menu-button--yellow">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#facc15"></path>
            </svg>Pending
          </button></li>
        <li class="menu-item"><button data-action="status" data-status="progress"
            class="menu-button menu-button--green">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#16a34a"></path>
            </svg>
            Progress</button></li>
        <li class="menu-item"><button data-action="status" data-status="stopped" class="menu-button menu-button--red">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#ef4444"></path>
            </svg>
            Stopped</button></li>
        <li class="menu-item"><button data-action="status" data-status="null"
            class="menu-button menu-button--white menu-button--checked">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#f9fafb"></path>
            </svg>No status</button>
        </li>
      </ul>
    </li>
    <!-- <li class="menu-item"><button class="menu-button"><i data-feather="link"></i>Copy Link Address</button></li>
    <li class="menu-item"><button class="menu-button"><i data-feather="folder-plus"></i>Move to</button></li>
    <li class="menu-item"><button class="menu-button"><i data-feather="copy"></i>Copy to</button></li>
    <li class="menu-item"><button class="menu-button"><i data-feather="lock"></i>Make Private</button></li>
    <li class="menu-item"><button class="menu-button"><i data-feather="download"></i>Download</button></li> -->
  </ul>
  <ul class="menu-list">
    <li class="menu-item"><button data-action="delete" class="menu-button menu-button--delete">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Eliminar
      </button>
    </li>
  </ul>
</div>`;

    this.menu = this.shadowRoot.getElementById('custom-menu');

    this.shadowRoot.querySelectorAll('.menu-button').forEach(item => {
      item.addEventListener('click', () => {
        if (item.dataset.action === 'edit') this.editTask();
        if (item.dataset.action === 'delete') this.deleteTask();
        if (item.dataset.action === 'description') this.editDescription();
        if (item.dataset.action === 'copy') this.copyTask();
        if (item.dataset.action === 'status') this.changeStatus(item.dataset.status);
      })
    })

    document.addEventListener('contextmenu', this.showMenu.bind(this));
    document.addEventListener('click', this.hideMenu.bind(this));
  }

  showMenu(event) {
    const x = event.clientX;
    const y = event.clientY;
    const targetElement = document.elementFromPoint(x, y);
    const closestTaskList = targetElement.closest('task-list');
    if (closestTaskList) {
      event.preventDefault();
      this.lastTaskClicked = closestTaskList;
      this.menu.style.left = `${event.pageX}px`;
      this.menu.style.top = `${event.pageY}px`;
      this.menu.style.display = 'block';
    }
  }

  hideMenu() {
    this.menu.style.display = 'none';
  }

  editTask() {
    const event = new CustomEvent('input-edit', {
      detail: getTask(Number(this.lastTaskClicked.id))
    });
    document.dispatchEvent(event);
  }

  deleteTask() {
    removeOpenTask(Number(this.lastTaskClicked.id));
    removeClosedTask(Number(this.lastTaskClicked.id));
    saveTasksToLocalStorage();
    const event = new CustomEvent('toast-message', {
      detail: 'Tarea eliminada'
    });
    document.dispatchEvent(event);
  }


  editDescription() {
    const event = new CustomEvent('modal-message', {
      detail:
        getTask(Number(this.lastTaskClicked.id))

    });
    document.dispatchEvent(event);
  }

  copyTask() {
    const text = getText(Number(this.lastTaskClicked.id));
    copyTextToClipboard();
    const event = new CustomEvent('toast-message', {
      detail: `"${text}" copiado a portapapeles`
    });
    document.dispatchEvent(event);
  }

  changeStatus(status) {
    changeTaskStatus(Number(this.lastTaskClicked.id), status);
  }
}
customElements.define('contextual-menu', ContextualMenu);

function copyTextToClipboard(text) {
  // Create a temporary text element
  const tempElement = document.createElement("textarea");
  tempElement.value = text;

  // Add the element to the document
  document.body.appendChild(tempElement);

  // Select the text
  tempElement.select();

  // Copy the text to the clipboard
  document.execCommand("copy");

  // Remove the temporary element from the document
  document.body.removeChild(tempElement);
}