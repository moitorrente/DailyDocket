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
      width: 249px;
      height: 100%;
      background-color: #111827;
      border-right: 1px solid #4b5563;
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
      color: #d1d5db;
    }
    .sidebar input {
      padding: 10px;
      border-radius: 5px;
      border: none;
      background-color: #374151;
      color: #f9fafb;
    }
    #title{
      padding:10px;
      font-size: large;
      font-weight: 500;
      color: #e5e7eb;
      display:flex;
      align-items: center;
    }
    input[type="text"] {
      padding: 7px;
      border: none;
      border-radius: 5px;
      width: 100%;
      margin-right: 10px;
    }
    .sidebar svg {
      fill: white;
    }
    #add {
      cursor: pointer;
      border: 1px solid #111827;
      color: white;
      padding: 7px;
      text-align: center;
      width: 21px;
      background-color: #374151;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #add:hover{
      border: 1px solid #d1d5db;
    }

    li{
      padding: 8px;
      padding-left: 12px;
      border-radius: 5px;
      cursor: pointer;
    }

    li:hover{
      background-color: #374151;
    }

    hr{
      color: #4b5563;
    }
  </style>
  
        <div class="sidebar">
          <div style="display:flex; align-items: center;" id="title">
          <div style="flex-grow: 1;">Workspaces</div>
          <svg id="close" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </div>
          <div style="display:flex; align-items: center; margin: 10px;">
          <input type="text" placeholder="Search...">
            <div id="add">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
            </div>
          </div>
          <hr style="border: none;border-top: 1px solid #4b5563;             ">
          <ul>
            <li><span>Home</span></li>
            <li><span>About</span></li>
            <li><span>Services</span></li>
            <li><span>Contact</span></li>
          </ul>
        </div>
      `;



    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.sidebar = this.shadowRoot.querySelector(".sidebar");
    this.close = this.shadowRoot.querySelector("svg");
    this.close.addEventListener('click', this.hideSidebar.bind(this));
    this.input = this.shadowRoot.querySelector("input");
    this.input.disabled = true;
    this.listContainer = this.shadowRoot.querySelector("ul");

  }

  toggleSidebar() {
    this.sidebar.classList.toggle("show");
    this.input.disabled = !this.input.disabled;
  }

  showSidebar() {
    console.log('show')
    this.sidebar.classList.add("show");
    this.input.disabled = false;
  }

  hideSidebar() {
    console.log('hide')

    this.sidebar.classList.remove("show");
    this.input.disabled = true;
  }
}

customElements.define("sidebar-navigation", SidebarNavigation);