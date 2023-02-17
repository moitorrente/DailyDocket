class CustomMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
          #custom-menu {
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            border: 1px solid #d3d3d3;
            z-index: 1;
          }
  
          #custom-menu a {
            color: black;
            padding: 8px 16px;
            text-decoration: none;
            display: block;
          }
  
          #custom-menu a:hover {
            background-color: #d3d3d3;
          }
        </style>
  
        <div id="custom-menu">
          <a href="#">Opción 1</a>
          <a href="#">Opción 2</a>
          <a href="#">Opción 3</a>
        </div>
      `;

        this.menu = this.shadowRoot.getElementById('custom-menu');

        document.addEventListener('contextmenu', this.showMenu.bind(this));
        document.addEventListener('click', this.hideMenu.bind(this));
    }

    showMenu(event) {
        event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        const targetElement = document.elementFromPoint(x, y);
        const closestCustomMenu = targetElement.closest('task-list');

        this.menu.style.left = `${event.pageX}px`;
        this.menu.style.top = `${event.pageY}px`;
        this.menu.style.display = 'block';
    }

    hideMenu() {
        this.menu.style.display = 'none';
    }
}

customElements.define('custom-menu', CustomMenu);