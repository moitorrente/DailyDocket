class ElementCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const countId = this.getAttribute("count-id");
    const countText = this.getAttribute("count-text") || " tareas";
    const showSVG = this.getAttribute("svg");

    const observer = new MutationObserver(() => {
      const count = document.getElementById(countId).querySelectorAll("task-list").length;
      shadowRoot.querySelector("#count").textContent = count + countText;
    });

    const expandSVG = `
    <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
      </path>
    </svg>`;

    let svg = showSVG ? expandSVG : '';

    observer.observe(document.getElementById(countId), { childList: true, subtree: true });
    const template = `
        <style>
          div {
            color: #6b7280;
            font-weight: 300;
            font-size: .8rem;
            text-align: right;
            padding: 6px;
            display: flex;
            align-items: center;
            transition: background-color .3s ease;
          }

          div:hover{
            background-color: #f3f4f6;
            border-radius: 5px;
          }

          /* Estilos para modo oscuro */
          @media (prefers-color-scheme: dark) {
            div {
              color: #f9fafb;
            }
            div:hover{
              background-color: #1f2937;
            }
          }
        </style>
        <div>      
        ${svg}              
          <span id="count"></span>
        </div>
      `;

    shadowRoot.innerHTML = template;
    shadowRoot.querySelector("#count").textContent = document.getElementById(countId).querySelectorAll("task-list").length + countText;
  }
}

customElements.define("element-counter", ElementCounter);
