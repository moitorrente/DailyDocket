class TaskList extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });

        const template = `
        <style>

        .task {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: 0 .5rem 0 0.5rem;
            transition: background-color 0.4s ease;
        }
        
        /* estilos para el texto */
        .task-text {
            color: #6b7280;
            flex-grow: 1;
            font-size: medium;
            box-shadow: inset 0px 1px 0px #f3f4f6;
            padding: .5rem 0 .5rem 0;
            word-wrap: break-word;
            width: 82%;
        }
        
        /* estilos para la fecha */
        .task-date {
            font-size: xx-small;
            color: #6b7280;
            width: fit-content;
            white-space: nowrap;
        }
        
        input[type="checkbox"] {
            display: none;
            /* ocultar el checkbox real */
        }
        
        /* estilo del label que lo sustituye */
        label[for="myCheckbox"] {
            display: inline-block;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            background-color: white;
            border-radius: 10px;
            vertical-align: middle;
            border: 1px solid #f3f4f6;
            box-shadow: 0px 1px 2px rgb(0 0 0 / 10%);
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
            background-size: cover;
        }
        
        input[type="checkbox"]:checked+label {
            background-color: #9ca3af;
            /* quitar el color de fondo */
            background-image: url("check.svg");
            /* imagen personalizada del tick blanco */
        }
        
        .task:hover {
            background-color: #f3f4f6;
            border-radius: 10px;
        }
        
        .task:hover .task-date {
            display: block;
        }
        
        .task-date {
            display: none;
        }
        </style>
  
        <div class="task" id="">
        <input type="checkbox" id="myCheckbox">
<label for="myCheckbox"></label>
          <input type="checkbox" name="" id="">
          <div class="task-text">
            <slot name="title"></slot>
          </div>
          <div class="task-date">
            <slot name="date"></slot>
          </div>
        </div>
      `;
        shadowRoot.innerHTML = template;

        const checkbox = shadowRoot.querySelector("input[type='checkbox']");
        const _this = this;
        const open = document.querySelector('#open');
        const closed = document.querySelector('#closed');

        // Escuchar los cambios en el estado del checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                removeOpenTask(this.taskId);
                addClosedTask(this.taskText, this.taskDate, this.taskId);
            } else {
                removeClosedTask(this.taskId);
                addOpenTask(this.taskText, this.taskDate, this.taskId);
            }
        })
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot[name="title"]');
        const assignedNodes = slot.assignedNodes();
        this.taskText = assignedNodes[0].textContent;
        const slotDate = this.shadowRoot.querySelector('slot[name="date"]');
        const assignedNodesDate = slotDate.assignedNodes();
        this.taskDate = assignedNodesDate[0].textContent;
        this.taskId = Number(this.getAttribute("id"));
    }
}

customElements.define("task-list", TaskList);