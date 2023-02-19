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
            border-radius: 10px;
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
            opacity: 0;
            font-size: xx-small;
            color: #6b7280;
            width: fit-content;
            white-space: nowrap;
            transition: opacity 0.4s ease;
          }
          
          .task:hover {
            background-color: #f3f4f6;
          }
          
          .task:hover .task-date {
            opacity: 1;
          }
        
        input[type="checkbox"] {
            display: none;
            /* ocultar el checkbox real */
        }
        
        /* estilo del label que lo sustituye */
        label[for="myCheckbox"] {
            display: inline-block;
            width: 14px;
            height: 14px;
            flex-shrink: 0;
            background-color: #f9fafb;
            border-radius: 5px;
            vertical-align: middle;
            border: 1px solid #d1d5db;
            box-shadow: 0px 1px 2px rgb(0 0 0 / 10%);
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
            background-size: cover;
            transition: border 0.2s ease;
        }

        label[for="myCheckbox"]:hover {
            border: 1px solid #9ca3af;
        }
        
        input[type="checkbox"]:checked+label {
            background-color: #9ca3af;
            border: 1px solid #9ca3af;
            /* quitar el color de fondo */
            background-image: url("check.svg");
            /* imagen personalizada del tick blanco */
        }
        input[type="checkbox"]:checked:hover+label {
            border: 1px solid #6b7280;
            /* quitar el color de fondo */
            background-image: url("check.svg");
            /* imagen personalizada del tick blanco */
        }
        

        </style>
  
        <div class="task" id="">
            <input type="checkbox" id="myCheckbox">
            <label for="myCheckbox"></label>
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