class InputText extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        const input = document.createElement('input');
        this.input = input;
        this.taskId = localStorage.getItem('maxId') || 0;

        localStorage.setItem('mode', 'dark')

        input.type = 'text';
        input.style.border = 'none';
        input.style.backgroundColor = '#e5e7eb';
        input.style.color = '#4b5563';
        input.style.borderRadius = '10px';
        input.style.padding = '12px';
        input.style.fontWeight = '400';
        input.style.fontSize = '18px';


        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");


        input.style.width = '100%';
        input.style.outline = 'none';
        input.style.boxSizing = 'border-box';
        input.placeholder = 'Añadir tarea';
        input.style.placeholder = 'white'

        const menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.fontSize = '13px';
        menu.style.top = '145px';
        menu.style.color = '#6b7280';
        menu.style.padding = '6px';
        menu.style.width = '100%';
        menu.style.maxWidth = '300px';
        menu.style.outline = 'none';
        menu.style.boxSizing = 'border-box';
        menu.style.backgroundColor = '#f3f4f6';
        menu.style.display = 'none';
        menu.style.borderRadius = '8px';
        menu.style.boxShadow = 'rgb(0 0 0 / 7%) 10px 10px 10px 0px';



        if (prefersDarkScheme.matches) {
            input.style.backgroundColor = '#374151';
            input.style.color = '#f9fafb';
            menu.style.color = '#f9fafb';
            menu.style.backgroundColor = '#374151';
        }

        const options = ['/delete', '/log', '/complete', '/update', '/version', '/test', '/export', '/md', '/modal', '/sidebar', '/timer'];
        const descriptions = ['Borra todas las tareas', 'Muestra el log de acciones', 'Completa las tareas abiertas', 'Actualiza la aplicación', 'Consulta la versión de la aplicación', 'Test de toast', 'Exporta a .txt', 'Exporta a .md', 'Prueba de modal', 'Muestra sidebar', 'Crea un temporizador']
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
                if (prefersDarkScheme.matches) item.style.backgroundColor = '#4b5563';
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
                this.taskId++;
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
                localStorage.setItem('maxId', this.taskId)

                const inputText = input.value.trim();
                const spaceIndex = inputText.indexOf(' ');
                const command = spaceIndex === -1 ? inputText : inputText.slice(0, spaceIndex);
                const param = spaceIndex === -1 ? '' : inputText.slice(spaceIndex + 1);
                if (command.startsWith('/')) {
                    this.executeOption(command, param);
                } else {
                    const htmlToShow = this.transformMDtoHTML(input.value);
                    const onlyText = this.removeMarkdown(input.value);
                    createOpenTask(htmlToShow, input.value, onlyText, date.innerHTML, this.taskId);
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
                            //input.value = '';
                            menu.style.display = 'none';
                            input.focus();
                        });
                        item.addEventListener('mouseenter', () => {
                            if (prefersDarkScheme.matches) item.style.backgroundColor = '#4b5563';
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

        window.addEventListener('click', (event) => {
            menu.style.display = 'none';
            const x = event.clientX;
            const y = event.clientY;
            const targetElement = document.elementFromPoint(x, y);
            const sidebar = targetElement.closest('input-text');
            // if (event.target != 'input-text') {
            //     const sidebarNavigation = document.querySelector("sidebar-navigation");
            //     sidebarNavigation.hideSidebar();
            // }

        });
        container.appendChild(input);
        container.appendChild(menu);
        shadow.appendChild(container);
    }

    connectedCallback() {
        document.addEventListener('input-edit', (event) => {
            this.input.value = event.detail;
        });
    }

    executeOption(option, param) {
        const options = {
            '/delete': () => this.deleteAll(),
            '/test': () => this.toastTest(param),
            '/update': () => this.update(),
            '/version': () => this.toastTest('Version: 1.3'),
            '/export': () => this.exportText(),
            '/md': () => this.exportMD(),
            '/modal': () => this.showModal('Título', 'Contenido'),
            '/log': () => this.log(),
            '/sidebar': () => this.sidebar(),
            '/timer': () => this.timer(param)
        };



        const selectedOption = options[option];
        if (selectedOption) {
            selectedOption();
        } else {
            this.toastTest('Comando no válido');
            this.input.value = '';
        }
    }

    timer(time) {
        if (!time) {
            this.input.value = '/timer ';
            return;
        }
        const timerComponent = document.querySelector('timer-component');
        if (isNaN(time)) {
            this.toastTest(`Número de minutos no válido: ${time}`)
        } else {
            timerComponent.setAttribute('time', time);
        }
        this.input.value = '';
    }

    deleteAll() {
        removeAllTasks();
        localStorage.setItem('maxId', 0);
        this.taskId = 0;

        document.querySelector('.open').innerHTML = '';
        document.querySelector('.closed').innerHTML = '';
        const event = new CustomEvent('toast-message', {
            detail: ' Todas las tareas han sido borradas'
        });
        document.dispatchEvent(event);
        this.input.value = '';

    }

    toastTest(text = 'Test de toast') {
        const event = new CustomEvent('toast-message', {
            detail: text
        });
        document.dispatchEvent(event);
        this.input.value = '';
    }

    showModal(title, body) {
        const event = new CustomEvent('modal-message', {
            detail: [title, body]
        });
        document.dispatchEvent(event);
        this.input.value = '';
    }

    log() {
        const title = 'Log';
        const taskEvents = JSON.parse(localStorage.getItem('taskEvents')) || [];
        function generateHTMLFromArray(data) {
            const headerRow = "<tr><th>Tipo</th><th>Tarea</th><th>Timestamp</th></tr>";

            const bodyRows = data.map(item => {
                const { type, task, timestamp } = item;
                return `<tr><td>${type}</td><td>${task}</td><td style="width: fit-content;">${timestamp}</td></tr>`;
            }).join("");

            return `<table style="border-collapse: collapse; width: 100%; margin-top: 20px; text-align: left;">
                        <thead>${headerRow}</thead>
                        <tbody style="font-size: small;">${bodyRows}</tbody>
                        <tfoot></tfoot>
                    </table>`;
        }
        const event = new CustomEvent('modal-message', {
            detail: [title, generateHTMLFromArray(taskEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))]
        });
        document.dispatchEvent(event);
        this.input.value = '';
    }

    update() {
        this.input.value = '';
        forceReload();
    }

    exportText() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `   - ${task.text}`).join('\r\n');
        const closedTasksText = closedTasks.map(task => `   - ${task.text} > ${task.date} - ${task.closed ? task.closed : ''}`).join('\r\n');
        const exporText = `Tareas abiertas \r\n${openTasksText} \r\n\r\nTareas cerradas \r\n${closedTasksText}`;
        downloadFile(exporText, `Tareas ${new Date().toLocaleString()}.txt`);
        this.input.value = '';
    }

    exportMD() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `- [ ] ${task.text}`).join('\n');
        const closedTasksText = closedTasks.map(task => `- [x] ${task.text}`).join('\n');
        const exportText = `## Tareas abiertas\n\n${openTasksText}\n\n## Tareas cerradas\n\n${closedTasksText}`;
        downloadFile(exportText, `Tareas ${new Date().toLocaleString()}.md`);
        this.input.value = '';
    }

    transformMDtoHTML(input) {
        this.input.value = '';
        return input
            .replace(/\*\*_(.+?)_\*\*/g, '<strong><i>$1</i></strong>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<i>$1</i>')
            .replace(/==([^*]+)==/g, '<span style="color: #2142b0; background-color: #dbeafe; border-radius: 5px; padding: 5px; padding-top: 2px; padding-bottom: 2px;">$1</span>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\s+\"([^"]+)\"\)/g, '<a href="$2" title="$3">$1</a>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2">$1</a>')
            // .replace(/(#+) (.+)/g, (match, level, title) => `<h${level.length}>${title}</h${level.length}>`)
            .replace(/```(.+?)\n([\s\S]+?)\n```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    removeMarkdown(input) {
        this.input.value = '';
        return input
            .replace(/\*\*_(.+?)_\*\*/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/==([^*]+)==/g, '$1')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\s+\"([^"]+)\"\)/g, '$1')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '$1')
            .replace(/```(.+?)\n([\s\S]+?)\n```/g, '$2')
            .replace(/`([^`]+)`/g, '$1');
    }

    sidebar() {
        const sidebarNavigation = document.querySelector("sidebar-navigation");
        sidebarNavigation.toggleSidebar();
        this.input.value = '';
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
