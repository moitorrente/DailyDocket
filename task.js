class TaskList extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        // const title = this.getAttribute("title");
        // const date = this.getAttribute("date");
        const template = `
        <style>
          /* estilos para la lista de tareas */
          .task {
            display: flex;
            align-items: center;
            gap: .5rem;
            padding: 0 .5rem 0 0.5rem;
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
        }
        
        input[type="checkbox"]:checked {
            background-color: #ccc;
            border-color: #ccc;
            color: #fff;
            .task:hover {
                background-color: #f3f4f6;
                border-radius: 10px;
            }
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
        const taskId = this.getAttribute("id");
        const checkbox = shadowRoot.querySelector("input[type='checkbox']");


        const _this = this;
        const open = document.querySelector('#open');
        const closed = document.querySelector('#closed');

        // Escuchar los cambios en el estado del checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                closed.prepend(_this);
            } else {
                open.appendChild(_this);
            }
        })
    }


}

customElements.define("task-list", TaskList);