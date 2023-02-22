class ElementCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const countId = this.getAttribute("count-id");
    const countText = this.getAttribute("count-text") || " tareas";
    const observer = new MutationObserver(() => {
      const count = document.getElementById(countId).querySelectorAll("task-list").length;
      shadowRoot.querySelector("#count").textContent = count + countText;
    });

    observer.observe(document.getElementById(countId), { childList: true, subtree: true });
    const template = `
        <style>
          div {
            color: #9ca3af;
            font-weight: 300;
            font-size: .8rem;
            text-align: right;

          }
        </style>
        <div>
          <span id="count"></span>
        </div>
      `;

    shadowRoot.innerHTML = template;
    shadowRoot.querySelector("#count").textContent = document.getElementById(countId).querySelectorAll("task-list").length + countText;

  }
}

customElements.define("element-counter", ElementCounter);