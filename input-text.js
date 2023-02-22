class InputText extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const input = document.createElement('input');
        this.taskId = shadow.querySelectorAll('task-list').length;
        this.taskId++;

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
        menu.style.top = '160px';
        menu.style.color = '#6b7280';
        menu.style.padding = '6px';
        menu.style.width = '100%';
        menu.style.maxWidth = '350px';
        menu.style.outline = 'none';
        menu.style.boxSizing = 'border-box';
        menu.style.backgroundColor = '#f3f4f6';
        menu.style.display = 'none';
        menu.style.borderRadius = '8px';
        menu.style.boxShadow = 'rgb(0 0 0 / 7%) 10px 10px 10px 0px';

        const options = ['/delete', '/deletecompleted', '/complete', '/update', '/version', '/test', '/export', '/md', '/modal'];
        const descriptions = ['Borra todas las tareas', 'Borra las tareas completadas', 'Completa las tareas abiertas', 'Actualiza la aplicación', 'Consulta la versión de la aplicación', 'Test de toast', 'Exporta a .txt', 'Exporta a .md', 'Prueba de modal']
        options.forEach((option, index) => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.alignItems = 'baseline';
            item.style.justifyContent = 'space-between';
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
            item.style.paddingRight = '12px'
            item.style.borderRadius = '8px';
            item.style.fontSize = '13px';

            item.addEventListener('click', () => {
                // Lógica para ejecutar acción según opción seleccionada
                this.executeOption(option)
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
            const text = event.target.value.trim();

            if (event.keyCode === 13 && text.length) {
                const taskList = document.createElement('task-list');
                taskList.setAttribute('id', this.taskId);
                const title = document.createElement('span');
                title.setAttribute('slot', 'title');
                title.innerHTML = input.value;
                const date = document.createElement('span');
                date.setAttribute('slot', 'date');
                date.setAttribute('rawDate', new Date().toLocaleDateString('es-ES'));
                date.innerHTML = new Date().toLocaleDateString('es-ES');
                taskList.appendChild(title);
                taskList.appendChild(date);
                this.taskId++;

                const [command, param] = input.value.split(' ').filter(Boolean);
                if (command.startsWith('/')) {
                    this.executeOption(command, param);
                } else {
                    const text = this.transformMDtoHTML(input.value);
                    addOpenTask(text, date.innerHTML, this.taskId);
                }
                input.value = '';
            } else if (text.startsWith('/')) {
                // Mostrar menú de comandos que coinciden con el texto ingresado
                const matchedCommands = options.filter(option => option.startsWith(text));
                if (matchedCommands.length > 0) {
                    menu.innerHTML = '';
                    matchedCommands.forEach((option, index) => {
                        const item = document.createElement('div');
                        item.style.display = 'flex';
                        item.style.alignItems = 'baseline';
                        item.style.justifyContent = 'space-between';
                        const command = document.createElement('div');
                        command.style.width = '80px';
                        const description = document.createElement('div');
                        command.innerHTML = option;
                        description.style.color = '#9ca3af';
                        description.innerHTML = descriptions[options.indexOf(option)];
                        description.style.fontSize = '10px';
                        item.appendChild(command);
                        item.appendChild(description);
                        item.style.padding = '6px';
                        item.style.paddingLeft = '12px'
                        item.style.paddingRight = '12px'
                        item.style.borderRadius = '8px';
                        item.style.fontSize = '13px';

                        item.addEventListener('click', () => {
                            // Lógica para ejecutar acción según opción seleccionada
                            this.executeOption(option)
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
                    menu.style.display = 'block';
                }
            } else {
                // Ocultar menú si no hay coincidencias
                menu.style.display = 'none';
            }
        });

        window.addEventListener('click', () => menu.style.display = 'none');

        shadow.appendChild(input);
    }

    executeOption(option, param) {
        const options = {
            '/delete': () => this.deleteAll(),
            '/test': () => this.toastTest(param),
            '/update': () => this.update(),
            '/version': () => this.toastTest('Version: 1.2'),
            '/export': () => this.exportText(),
            '/md': () => this.exportMD(),
            '/modal': () => this.showModal('Título', 'Contenido'),
        };

        const selectedOption = options[option];
        if (selectedOption) {
            selectedOption();
        } else {
            this.toastTest('Comando no válido');
        }
    }

    deleteAll() {
        document.querySelector('.open').innerHTML = '';
        document.querySelector('.closed').innerHTML = '';
        const event = new CustomEvent('toast-message', {
            detail: ' Todas las tareas han sido borradas'
        });
        document.dispatchEvent(event);

        removeAllTasks();
    }

    toastTest(text = 'Test de toast') {
        const event = new CustomEvent('toast-message', {
            detail: text
        });
        document.dispatchEvent(event);
    }

    showModal(title, body) {
        const event = new CustomEvent('modal-message', {
            detail: [title, body]
        });
        document.dispatchEvent(event);
    }

    update() {
        forceReload();
    }

    exportText() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `- ${task.description}`).join('\r\n');
        const closedTasksText = closedTasks.map(task => `- ${task.description}`).join('\r\n');
        const exporText = `Tareas abiertas \r\n${openTasksText} \r\n\r\nTareas cerradas \r\n${closedTasksText}`;
        downloadFile(exporText, `Tareas ${new Date().toLocaleString()}.txt`)
    }

    exportMD() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `   - ${task.description}`).join('\r\n');
        const closedTasksText = closedTasks.map(task => `   - ${task.description}`).join('\r\n');
        const exporText = `\r\n# Tareas abiertas \r\n${openTasksText} \r\n\r\n# Tareas cerradas \r\n${closedTasksText}`;
        downloadFile(exporText, `Tareas ${new Date().toLocaleString()}.md`)
    }

    transformMDtoHTML(input) {
        return input
            .replace(/\*\*_(.+?)_\*\*/g, '<strong><i>$1</i></strong>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<i>$1</i>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\s+\"([^"]+)\"\)/g, '<a href="$2" title="$3">$1</a>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2">$1</a>')
            // .replace(/(#+) (.+)/g, (match, level, title) => `<h${level.length}>${title}</h${level.length}>`)
            .replace(/```(.+?)\n([\s\S]+?)\n```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }
}

function downloadFile(texto, nombreArchivo) {
    const archivo = new Blob([texto], { type: 'text/plain' });
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(archivo);
    enlaceDescarga.download = nombreArchivo;
    enlaceDescarga.click();
    const event = new CustomEvent('toast-message', {
        detail: 'Tareas descargadas'
    });
    document.dispatchEvent(event);
}

async function forceReload() {
    (await caches.keys()).forEach(c => caches.delete(c))
    navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
            Promise.all(registrations.map((r) => r.unregister())),
        )
        .then(() => {
            window.location.reload(true);
        });
}

customElements.define('input-text', InputText);
