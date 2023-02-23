class CustomMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lastTaskClicked = null;
    this.shadowRoot.innerHTML = `
      <style>
        #custom-menu {
          display: none;
          position: absolute;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          font-size: small;
          padding: 2px;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        #custom-menu a {
          color: black;
          padding: 6px 10px 6px 10px;
          text-decoration: none;
          display: block;
        }

        #custom-menu a:hover {
          background-color: #e5e7eb;
          border-radius: 8px;
        }
      </style>

      <div id="custom-menu">
        <a href="#" style="display: flex; align-items: center; gap: 3px; color: #374151;"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>Eliminar</a>
      </div>
    `;

    this.menu = this.shadowRoot.getElementById('custom-menu');

    // Agregamos un manejador de eventos al hacer clic en los enlaces
    this.shadowRoot.querySelectorAll('#custom-menu a').forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (index === 0) {
          removeOpenTask(Number(this.lastTaskClicked));
          removeClosedTask(Number(this.lastTaskClicked));
        }
        this.hideMenu();
      });
    });

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
      this.lastTaskClicked = closestTaskList.id
      this.menu.style.left = `${event.pageX}px`;
      this.menu.style.top = `${event.pageY}px`;
      this.menu.style.display = 'block';
    }
  }

  hideMenu() {
    this.menu.style.display = 'none';
  }
}

customElements.define('custom-menu', CustomMenu);