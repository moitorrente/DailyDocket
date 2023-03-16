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

        this.editing = false;
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");


        input.style.width = '100%';
        input.style.outline = 'none';
        input.style.boxSizing = 'border-box';
        input.placeholder = 'Añadir tarea';
        input.style.placeholder = 'white'

        const menu = document.createElement('div');
        menu.id = 'menu';
        menu.style.position = 'absolute';
        menu.style.fontSize = '13px';
        menu.style.top = '175px';
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

        const options = ['/delete', '/log', '/complete', '/update', '/version', '/test', '/export', '/md', '/modal', '/sidebar', '/timer', '/counter'];
        const descriptions = ['Borra todas las tareas', 'Muestra el log de acciones', 'Completa las tareas abiertas', 'Actualiza la aplicación', 'Consulta la versión de la aplicación', 'Test de toast', 'Exporta a .txt', 'Exporta a .md', 'Prueba de modal', 'Muestra sidebar', 'Crea un temporizador', 'Crea un contador']
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

                let inputText = input.value.trim();
                const spaceIndex = inputText.indexOf(' ');
                const command = spaceIndex === -1 ? inputText : inputText.slice(0, spaceIndex);
                const param = spaceIndex === -1 ? '' : inputText.slice(spaceIndex + 1);
                if (command.startsWith('/')) {
                    this.executeOption(command, param);
                } else {
                    if (text.startsWith('=')) {
                        inputText = `${inputText.slice(1)} = ${this.calculadora(inputText.slice(1))}`;
                    }
                    const htmlToShow = this.transformMDtoHTML(inputText);
                    const onlyText = this.removeMarkdown(inputText);
                    if (this.editing) {
                        editTask(this.editing, htmlToShow, inputText, onlyText, date.innerHTML);
                        this.editing = false;
                    } else {
                        createOpenTask(htmlToShow, inputText, onlyText, date.innerHTML, this.taskId);
                    }
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
            console.log(event.detail)
            this.editing = event.detail.id;
            this.input.value = event.detail.raw;
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
            '/timer': () => this.timer(param),
            '/counter': () => this.counter(),
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
        const timerComponent = document.querySelectorAll('timer-component');
        if (isNaN(time)) {
            this.toastTest(`Número de minutos no válido: ${time}`)
        } else {
            timerComponent.forEach(timer => timer.setAttribute('time', time));
        }
        this.input.value = '';
    }

    counter() {
        const counter = document.querySelector('my-counter');
        counter.setAttribute('show', true)
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
            .replace(/->/g, '<svg style="vertical-align: middle" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>')
            .replace(/<-/g, '<svg style="vertical-align: middle" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>')
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

    calculadora(str) {
        // Validar que la entrada sea una cadena de texto
        if (typeof str !== 'string') {
            throw new Error('La entrada debe ser una cadena de texto');
        }

        // Validar que la entrada solo contenga caracteres permitidos (números, operadores y paréntesis)
        if (!/^[0-9+\-*/().\s]*$/.test(str)) {
            throw new Error('La entrada contiene caracteres no permitidos');
        }

        // Validar que los paréntesis estén correctamente balanceados
        let parens = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                parens++;
            } else if (str[i] === ')') {
                parens--;
            }
            if (parens < 0) {
                throw new Error('Los paréntesis no están balanceados');
            }
        }
        if (parens !== 0) {
            throw new Error('Los paréntesis no están balanceados');
        }

        // Si la entrada es segura, evaluar la expresión y devolver el resultado
        return eval(str);
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
