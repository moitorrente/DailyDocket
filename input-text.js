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
        input.style.boxSizing = 'border-box';
        input.placeholder = 'Añadir tarea';

        const menu = document.createElement('div');
        const tituloMenu = document.createElement('div');
        tituloMenu.innerHTML = 'Comandos';
        tituloMenu.style.fontSize = '13px';
        tituloMenu.style.fontWeight = 'bold';
        tituloMenu.style.padding = '6px';
        menu.appendChild(tituloMenu);
        menu.style.position = 'absolute';
        menu.style.fontSize = '13px';
        menu.style.top = '185px';
        menu.style.color = '#6b7280';
        menu.style.padding = '6px';
        menu.style.width = '100%';
        menu.style.maxWidth = '350px';
        menu.style.outline = 'none';
        menu.style.boxSizing = 'border-box';
        menu.style.backgroundColor = '#f3f4f6';
        menu.style.display = 'none';
        menu.style.borderRadius = '10px';
        menu.style.boxShadow = 'rgb(0 0 0 / 5%) 10px 10px 10px 0px';

        const options = ['/delete', '/complete', '/otro'];
        const descriptions = ['Borra todas las tareas', 'Completa las tareas abiertas', 'Otro']
        options.forEach((option, index) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.alignItems = 'baseline';
            const command = document.createElement('div');
            command.style.width = '80px';
            const description = document.createElement('div');
            command.innerHTML = option;
            description.style.color = '#9ca3af';

            description.innerHTML = descriptions[index];
            description.style.fontSize = '10px';
            item.appendChild(command);
            item.appendChild(description);
            item.style.padding = '6px';
            item.style.paddingLeft = '12px'
            item.style.borderRadius = '10px';
            item.style.fontSize = '13px';

            item.addEventListener('click', () => {
                // Lógica para ejecutar acción según opción seleccionada
                if (option === '/delete') {
                    this.deleteAll();
                }
                input.value = '';
                menu.style.display = 'none';
                input.focus();
            });
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#e5e7eb';
                item.style.cursor = 'pointer';
            });

            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
            menu.appendChild(item);
        });
        shadow.appendChild(menu);
        // Agregar evento de teclado al input
        input.addEventListener('keyup', (event) => {
            menu.style.display = 'none';
            if (event.keyCode === 13 && input.value.length) {
                const taskList = document.createElement('task-list');
                taskList.setAttribute('id', 22);
                const title = document.createElement('span');
                title.setAttribute('slot', 'title');
                title.innerHTML = input.value;
                const date = document.createElement('span');
                date.setAttribute('slot', 'date');
                date.innerHTML = new Date().toLocaleDateString('es-ES');
                taskList.appendChild(title);
                taskList.appendChild(date);

                if (input.value == '/delete') {
                    this.deleteAll();
                } else {
                    document.querySelector('.open').appendChild(taskList);
                }

                input.value = '';
            } else if (input.value[0] == "/" && input.value.length === 1) {
                // Mostrar menú cuando el usuario escriba "/"

                menu.style.display = 'block';
                // input.blur();
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
