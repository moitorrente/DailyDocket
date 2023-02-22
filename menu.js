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
          padding: 6px 14px;
          text-decoration: none;
          display: block;
        }

        #custom-menu a:hover {
          background-color: #e5e7eb;
          border-radius: 8px;
        }
      </style>

      <div id="custom-menu">
        <a href="#">Eliminar</a>
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