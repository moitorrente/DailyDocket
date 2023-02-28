class TaskList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = `
        <style>
        :host {
          --bg-color: #f8fafc;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --gray-900: #111827;
        }

        .task {
            display: flex;
            align-items: center;
            gap: .5rem;
            border-radius: 10px;
            padding: 0 .5rem 0 .5rem;
            transition: background-color 0.4s ease;
            background-color: var(--bg-color);
        }

        /* estilos para el texto */
        .task-text {
            color: var(--gray-500);
            flex-grow: 1;
            font-size: medium;
            box-shadow: inset 0px 1px 0px var(--gray-100);
            padding: .5rem 0 .5rem 0;
            word-wrap: break-word;
            width: 82%;
        }

        /* estilos para la fecha */
        .task-date {
            opacity: 0;
            font-size: xx-small;
            color: var(--gray-500);
            width: fit-content;
            white-space: nowrap;
            transition: opacity 0.4s ease;
        }

        .task:hover {
            background-color: var(--gray-100);
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
            background-color: var(--gray-50);
            border-radius: 5px;
            vertical-align: middle;
            border: 1px solid var(--gray-300);
            box-shadow: 0px 1px 2px rgb(0 0 0 / 10%);
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
            background-size: cover;
            transition: border 0.2s ease;
        }

        label[for="myCheckbox"]:hover {
            border: 1px solid var(--gray-400);
        }

        input[type="checkbox"]:checked+label {
            background-color: var(--gray-400);
            border: 1px solid var(--gray-400);
            background-image: url("check.svg");
        }

        input[type="checkbox"]:checked:hover+label {
            border: 1px solid var(--gray-500);
            background-image: url("check.svg");
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-color: #f8fafc;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
          }
          
          .task {
            background-color: var(--gray-900);
          }
          
          .task:hover {
            background-color: var(--gray-800);
          }
          
          .task-text {
            box-shadow: inset 0px 1px 0px var(--gray-800);
            color: var(--gray-100);
          }
          
          .task-date {
            color: var(--gray-100);
          }
          
          input[type="checkbox"] + label {
            background-color: var(--gray-600);
            border: 1px solid var(--gray-600);
          }
          
          input[type="checkbox"]:checked + label {
            background-color: var(--gray-600);
            border: 1px solid var(--gray-600);
          }
          
          input[type="checkbox"]:checked:hover + label {
            border: 1px solid var(--gray-500);
          }
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

    // Escuchar los cambios en el estado del checkbox
    checkbox.addEventListener('change', () => {
      const { taskTitle, taskRaw, taskText, taskDate, taskId } = this;
      if (checkbox.checked) {
        removeOpenTask(taskId);
        addClosedTask(taskTitle, taskRaw, taskText, taskDate, taskId);
      } else {
        removeClosedTask(taskId);
        addOpenTask(taskTitle, taskRaw, taskText, taskDate, taskId);
      }
    })
  }
  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot[name="title"]');
    const assignedNodes = slot.assignedNodes();
    this.taskTitle = assignedNodes[0].outerHTML;
    const slotDate = this.shadowRoot.querySelector('slot[name="date"]');
    const assignedNodesDate = slotDate.assignedNodes();
    this.taskDate = assignedNodesDate[0].textContent;
    this.taskId = Number(this.getAttribute("id"));
    this.taskRaw = this.getAttribute("raw");
    this.taskText = this.getAttribute("text");
  }
}

customElements.define("task-list", TaskList);