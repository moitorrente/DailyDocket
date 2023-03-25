class ContextualMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lastTaskClicked = null;
    this.shadowRoot.innerHTML = `<style>
  .menu {
    width: 170px;
    display: none;
    position: absolute;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    font-size: 14px;
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
    width: 130px;
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
    padding: 7px 5px;
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
  .menu-button--blue svg:first-of-type {
    stroke: #2563eb;
    fill: #2563eb;
  }

  .menu-button--white svg:first-of-type {
    stroke: #f9fafb;
    fill: #f9fafb;
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
    <li class="menu-item"><button data-action="due-date" class="menu-button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Fecha entrega</button></li>
    <li class="menu-item"><button data-action="detail" class="menu-button">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.2 1H4.17741H4.1774C3.86936 0.999988 3.60368 0.999978 3.38609 1.02067C3.15576 1.04257 2.92825 1.09113 2.71625 1.22104C2.51442 1.34472 2.34473 1.51442 2.22104 1.71625C2.09113 1.92825 2.04257 2.15576 2.02067 2.38609C1.99998 2.60367 1.99999 2.86935 2 3.17738V3.1774V3.2V11.8V11.8226V11.8226C1.99999 12.1307 1.99998 12.3963 2.02067 12.6139C2.04257 12.8442 2.09113 13.0717 2.22104 13.2837C2.34473 13.4856 2.51442 13.6553 2.71625 13.779C2.92825 13.9089 3.15576 13.9574 3.38609 13.9793C3.60368 14 3.86937 14 4.17741 14H4.2H10.8H10.8226C11.1306 14 11.3963 14 11.6139 13.9793C11.8442 13.9574 12.0717 13.9089 12.2837 13.779C12.4856 13.6553 12.6553 13.4856 12.779 13.2837C12.9089 13.0717 12.9574 12.8442 12.9793 12.6139C13 12.3963 13 12.1306 13 11.8226V11.8V3.2V3.17741C13 2.86936 13 2.60368 12.9793 2.38609C12.9574 2.15576 12.9089 1.92825 12.779 1.71625C12.6553 1.51442 12.4856 1.34472 12.2837 1.22104C12.0717 1.09113 11.8442 1.04257 11.6139 1.02067C11.3963 0.999978 11.1306 0.999988 10.8226 1H10.8H4.2ZM3.23875 2.07368C3.26722 2.05623 3.32362 2.03112 3.48075 2.01618C3.64532 2.00053 3.86298 2 4.2 2H10.8C11.137 2 11.3547 2.00053 11.5193 2.01618C11.6764 2.03112 11.7328 2.05623 11.7613 2.07368C11.8285 2.11491 11.8851 2.17147 11.9263 2.23875C11.9438 2.26722 11.9689 2.32362 11.9838 2.48075C11.9995 2.64532 12 2.86298 12 3.2V11.8C12 12.137 11.9995 12.3547 11.9838 12.5193C11.9689 12.6764 11.9438 12.7328 11.9263 12.7613C11.8851 12.8285 11.8285 12.8851 11.7613 12.9263C11.7328 12.9438 11.6764 12.9689 11.5193 12.9838C11.3547 12.9995 11.137 13 10.8 13H4.2C3.86298 13 3.64532 12.9995 3.48075 12.9838C3.32362 12.9689 3.26722 12.9438 3.23875 12.9263C3.17147 12.8851 3.11491 12.8285 3.07368 12.7613C3.05624 12.7328 3.03112 12.6764 3.01618 12.5193C3.00053 12.3547 3 12.137 3 11.8V3.2C3 2.86298 3.00053 2.64532 3.01618 2.48075C3.03112 2.32362 3.05624 2.26722 3.07368 2.23875C3.11491 2.17147 3.17147 2.11491 3.23875 2.07368ZM5 10C4.72386 10 4.5 10.2239 4.5 10.5C4.5 10.7761 4.72386 11 5 11H8C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10H5ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM5 4C4.72386 4 4.5 4.22386 4.5 4.5C4.5 4.77614 4.72386 5 5 5H10C10.2761 5 10.5 4.77614 10.5 4.5C10.5 4.22386 10.2761 4 10 4H5Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        Detalle</button></li>
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
        <li class="menu-item"><button data-action="status" data-status="progress"
            class="menu-button menu-button--green">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#16a34a"></path>
            </svg>
            Progress
          </button></li>
        <li class="menu-item"><button data-action="status" data-status="pending"
            class="menu-button menu-button--yellow">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#facc15"></path>
            </svg>
            Pending
          </button></li>
        <li class="menu-item"><button data-action="status" data-status="planned"
            class="menu-button menu-button--blue">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                fill="#2563eb"></path>
            </svg>
            Planned
          </button></li>
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
        if (item.dataset.action === 'detail') this.detailTask();
        if (item.dataset.action === 'due-date') this.dueDateTask();
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


  detailTask() {
    const event = new CustomEvent('detail-message', {
      detail:
        getTask(Number(this.lastTaskClicked.id))

    });
    document.dispatchEvent(event);
  }

  dueDateTask() {
    const event = new CustomEvent('due-date-message', {
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