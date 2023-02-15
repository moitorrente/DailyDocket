class InputText extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const input = document.createElement('input');
        input.type = 'text';
        input.style.border = 'none';
        input.style.backgroundColor = '#f3f4f6';
        input.style.color = '#6b7280';
        input.style.borderRadius = '10px';
        input.style.padding = '12px';
        input.style.width = '100%';
        input.style.outline = 'none';
        input.style.boxSizing = "border-box";
        input.placeholder = 'Añadir tarea';

        // Añadir evento de teclado para capturar Enter y crear una tarea
        input.addEventListener('keyup', (event) => {
            if (event.keyCode === 13 && input.value.length) { // Código de Enter es 13
                const taskList = document.createElement('task-list');
                taskList.setAttribute('id', 22)
                const title = document.createElement('span');
                title.setAttribute('slot', 'title');
                title.innerHTML = input.value;
                const time = document.createElement('span');
                title.setAttribute('slot', 'title');
                title.innerHTML = input.value;
                taskList.appendChild(title);

                if (input.value == '/delete') {
                    this.deleteAll();
                } else {
                    document.querySelector('.open').appendChild(taskList);
                }

                input.value = ''; // Limpiar input
            }
        });



        shadow.appendChild(input);
    }

    deleteAll() {
        document.querySelector('.open').innerHTML = '';
        document.querySelector('.closed').innerHTML = '';
    }
}

customElements.define('input-text', InputText);