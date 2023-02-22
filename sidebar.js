class SidebarNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const template = document.createElement("template");
        template.innerHTML = `
        <style>
        button{
            display:none;
        }
          .sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100%;
            background-color: #333;
            color: #fff;
            z-index: 999;
            transition: left 0.3s ease-in-out;
          }
          .sidebar.show {
            left: 0;
          }
          .sidebar ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .sidebar li {
            margin: 10px;
          }
          .sidebar input {
            width: 100%;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            border: none;
          }
        </style>
        <div class="sidebar">
          <input type="text" placeholder="Search...">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <button>Show Sidebar</button>
      `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.sidebar = this.shadowRoot.querySelector(".sidebar");
        this.showButton = this.shadowRoot.querySelector("button");
        this.showButton.addEventListener("click", this.toggleSidebar.bind(this));
    }

    toggleSidebar() {
        this.sidebar.classList.toggle("show");
    }
}

customElements.define("sidebar-navigation", SidebarNavigation);