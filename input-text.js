class InputText extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.today = new Date().toLocaleDateString('es-ES');
        const container = document.createElement('div');
        container.style.width = '100%';

        const mainContainer = document.createElement('div');
        mainContainer.style.width = '100%';
        mainContainer.style.display = 'flex';
        mainContainer.style.gap = '5px';

        const input = document.createElement('input');
        this.input = input;
        this.taskId = localStorage.getItem('maxId') || 0;

        this.state = 'initial';

        const style = document.createElement('style');
        style.innerHTML = `input::selection {
  background-color: #64748b;
  color: white;
}

::-webkit-scrollbar {
  width: 4px;
  /* Ancho de la barra de desplazamiento */
}

::-webkit-scrollbar-track {
  background-color: transparent;
  /* Color del fondo de la barra de desplazamiento */
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  /* Color de la barra de desplazamiento */
  border-radius: 20px;
  /* Radio de la esquina de la barra de desplazamiento */
}

@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar {
    width: 2px;
    /* Ancho de la barra de desplazamiento */
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    /* Color del fondo de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #6b7280;
    /* Color de la barra de desplazamiento */
    border-radius: 20px;
    /* Radio de la esquina de la barra de desplazamiento */
  }

  input::selection {
    background-color: #64748b;
  }
}`;
        container.appendChild(style);

        input.type = 'text';
        input.style.border = 'none';
        input.style.backgroundColor = '#e5e7eb';
        input.style.color = '#4b5563';
        input.style.borderRadius = '5px';
        input.style.padding = '10px';
        input.style.fontWeight = '400';
        input.style.fontSize = '18px';

        this.editing = false;
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        this.prefersDarkScheme = prefersDarkScheme;

        input.style.width = '100%';
        input.style.outline = 'none';
        input.style.boxSizing = 'border-box';
        input.placeholder = 'Añadir tarea';
        input.style.placeholder = 'white'

        const menu = document.createElement('div');
        this.menu = menu;
        menu.id = 'menu';
        menu.style.fontSize = '13px';
        menu.style.top = '175px';
        menu.style.color = '#6b7280';
        menu.style.padding = '6px';
        menu.style.width = '100%';
        menu.style.marginTop = '5px'
        menu.style.outline = 'none';
        menu.style.boxSizing = 'border-box';
        menu.style.maxHeight = '40vh';
        menu.style.overflow = 'auto';
        menu.style.backgroundColor = '#f3f4f6';
        menu.style.display = 'none';
        menu.style.borderRadius = '5px';
        menu.style.zIndex = 999;

        if (prefersDarkScheme.matches) {
            input.style.backgroundColor = '#374151';
            input.style.color = '#f9fafb';
            menu.style.color = '#f9fafb';
            menu.style.backgroundColor = '#374151';
        }

        const apps = [
            { command: "/sticky", description: 'Crea una sticky note', action: () => this.sticky(), quick: 'S' },
            { command: "/hub", description: 'Lanza el hub de aplicaciones', action: () => this.hub(), quick: 'H' },
            { command: "/timer", description: 'Crea un temporizador', action: (time) => this.timer(time), quick: 'T', composable: true },
            // { command: "/test", description: 'Test de toast', action: (message) => this.toastTest(message), composable: true },
            { command: "/counter", description: 'Crea un contador', action: () => this.counter() },
            { command: "/calendar", description: 'Muestra el calendario', action: () => this.calendar(), quick: 'C' },
            { command: "/delete", description: 'Borra todas las tareas', action: () => this.deleteAll() },
            { command: "/update", description: 'Actualiza la aplicación', action: () => this.update(), quick: 'U' },
            { command: "/len", description: 'Devuelve la longitud del texto', action: (text) => this.len(text), composable: true, overlay: true },
            // { command: "/version", description: 'Consulta la versión de la aplicación', action: () => this.toastTest('Version: 1.3') },
            { command: "/export", description: 'Exporta las tareas en json', action: () => this.export(), quick: 'E' },
            { command: "/import", description: 'Importa las tareas desde json', action: () => this.import() },
            { command: "/text", description: 'Exporta a txt', action: () => this.exportText() },
            { command: "/md", description: 'Exporta a md', action: () => this.exportMD() },
            { command: "/upper", description: 'Convierte texto a mayúsculas', action: (text) => this.toUpper(text), composable: true, overlay: true },
            { command: "/lower", description: 'Convierte texto a minúsculas', action: (text) => this.toLower(text), composable: true, overlay: true },
            { command: "/words", description: 'Cuenta las palabras', action: (text) => this.countWords(text), composable: true, overlay: true },
            { command: "/title", description: 'Convierte texto a title case', action: (text) => this.toTitleCase(text), composable: true, overlay: true },
            { command: "/clock", description: 'Muestra la hora', action: () => this.clock() },
            { command: "/search", description: 'Busca en Google', action: (text) => this.search(text), composable: true, icon: `<svg width="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>` },
            // { command: "/sidebar", description: 'Muestra sidebar', action: () => this.sidebar() },
            // { command: "/stats", description: 'Muestra estadísticas', action: () => this.stats() },
        ];

        this.apps = apps;

        apps.forEach(app => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.alignItems = 'baseline';
            item.style.justifyContent = 'space-between';
            const command = document.createElement('div');
            command.style.width = '80px';
            command.style.fontWeight = '500';
            const description = document.createElement('div');
            command.innerHTML = app.command;
            description.style.color = '#9ca3af';
            description.innerHTML = app.description;
            description.style.fontSize = '10px';
            item.appendChild(command);
            item.appendChild(description);
            item.style.padding = '6px';
            item.style.paddingLeft = '12px'
            item.style.paddingRight = '12px'
            item.style.borderRadius = '8px';
            item.style.fontSize = '13px';

            item.addEventListener('click', () => {
                app.action();
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


        apps.forEach(app => {
            if (app.quick) {
                document.addEventListener('keyup', (event) => {
                    if (event.altKey && (event.key.toUpperCase() === app.quick)) {
                        event.preventDefault();
                        event.stopPropagation();
                        app.action();
                    }
                })
            }
        });

        input.addEventListener('keydown', (event) => {
            if ((event.keyCode === 46 || event.which === 46 || event.keyCode === 8 || event.which === 8) && commandContainer.innerHTML && input.value.length === 0) {
                this.setState('initial')
            }
        });

        input.addEventListener('keyup', (event) => {
            const text = event.target.value.trim();
            const firstChar = text.charAt(0);

            if (this.state === 'command' || this.state === 'overlay') {

            } else {
                if (text.length === 0) {
                    this.setState('initial');
                } else if (firstChar === '/') {
                    this.setState('input-command');
                } else if (firstChar === '=') {
                    this.setState('input-calculator');
                } else {
                    this.setState('input-text');
                }
            }

            if (this.state === 'input-calculator') {
                const calculatorOverlayContainer = document.querySelector('.overlay-container');
                const overlayComponent = document.createElement('overlay-component');
                overlayComponent.setAttribute('title', 'Calculadora');
                if (!calculatorOverlayContainer.innerHTML) calculatorOverlayContainer.appendChild(overlayComponent);
                const event = new CustomEvent('change-overlay', {
                    detail: {
                        input: separateNumbersAndCharacters(text.slice(1)),
                        output: this.calculadora(text.slice(1))
                    }
                });
                document.dispatchEvent(event);
            }

            if (this.state === 'input-calculator' && event.keyCode === 13) {
                const inputText = `\`${text.slice(1)} = == ${this.calculadora(text.slice(1))} ==\``;
                const openDate = new Date().toLocaleDateString('es-ES').toString();
                this.createTask(this.taskId++, inputText, openDate);
                this.setState('initial');
            }

            //Si no hay ningún input y se pulsa la flecha hacía arriba
            if (this.state === 'initial' && event.keyCode === 38) {
                const lastCommand = localStorage.getItem('last-command');
                if (lastCommand) input.value = lastCommand;
            }

            //Si se pulsa enter y estamos en modo texto
            if (this.state === 'input-text' && event.keyCode === 13) {
                const openDate = new Date().toLocaleDateString('es-ES').toString();

                // if (this.editing) {
                this.gestionaTask(this.editing, text, openDate);
                // } else {
                //     this.createTask(this.taskId++, input.value, openDate);
                // }
                this.setState('initial')
            }


            //Si estamos en modo comando y se pulsa enter
            if ((this.state === 'command' || this.state === 'overlay') && event.keyCode === 13) {
                const app = apps.find(app => app.command === this.command);
                if (app) app.action(text);
                this.setState('initial');
            }

            if (this.state === 'overlay') {
                const app = apps.find(app => app.command === this.command);
                const event = new CustomEvent('change-overlay', {
                    detail: {
                        input: text,
                        output: app.action(text)
                    }
                });
                document.dispatchEvent(event);
            }

            //Si estamos introduciendo el comando
            if (this.state === 'input-command') {
                const exactMatch = apps.find(option => option.command === (text));

                this.showCommandList(text);
                //Si hay un comando que es el entrado
                if (exactMatch) {
                    //Si el comando es composable
                    if (exactMatch?.composable) {
                        commandContainer.textContent = exactMatch.command;
                        // commandContainer.setAttribute('command', exactMatch.command);
                        if (exactMatch.icon) commandContainer.innerHTML = exactMatch.icon;
                        this.setState('command', exactMatch.command)

                        if (exactMatch.overlay) {
                            this.setState('overlay')

                            const calculatorOverlayContainer = document.querySelector('.overlay-container');
                            const overlayComponent = document.createElement('overlay-component');
                            overlayComponent.setAttribute('title', exactMatch.description);
                            if (!calculatorOverlayContainer.innerHTML) calculatorOverlayContainer.appendChild(overlayComponent);
                            const event = new CustomEvent('change-overlay', {
                                detail: {
                                    input: '',
                                    output: ''
                                }
                            });
                            document.dispatchEvent(event);
                        }
                        return;
                    } else {
                        //Si el comando no es composable se ejecuta
                        exactMatch.action();
                        this.setState('initial');
                        return;
                    }
                }
            }

        });

        window.addEventListener('click', (event) => {
            menu.style.display = 'none';
        });

        const commandContainer = document.createElement('div');
        this.commandContainer = commandContainer;
        commandContainer.textContent = '';
        commandContainer.style.width = '50px';
        commandContainer.style.alignItems = 'center';
        commandContainer.style.justifyContent = 'center';
        commandContainer.style.display = 'none';
        commandContainer.style.border = 'none';
        commandContainer.style.backgroundColor = '#e5e7eb';
        commandContainer.style.color = '#4b5563';
        if (prefersDarkScheme.matches) {
            commandContainer.style.backgroundColor = '#374151';
            commandContainer.style.color = '#f9fafb';
        }
        commandContainer.style.borderRadius = '5px';
        commandContainer.style.padding = '8px';
        commandContainer.style.fontWeight = '500';
        commandContainer.style.fontSize = '18px';
        mainContainer.appendChild(commandContainer);
        mainContainer.appendChild(input);

        container.appendChild(mainContainer);
        container.appendChild(menu);
        shadow.appendChild(container);
    }

    connectedCallback() {
        document.addEventListener('input-edit', (event) => {
            this.editing = event.detail.id;
            this.input.value = event.detail.raw;
        });
    }

    setState(state, command) {
        this.state = state;

        if (state === 'initial') {
            document.querySelector('.overlay-container').innerHTML = '';
            this.command = null;
            this.input.value = '';
            this.menu.style.display = 'none';
            this.commandContainer.style.display = 'none';
            this.input.focus();
        }

        if (state === 'command') {
            this.command = command;
            document.querySelector('.overlay-container').innerHTML = '';
            this.input.value = '';
            this.menu.style.display = 'none';
            this.commandContainer.style.display = 'flex';
            this.input.focus();
        }

        if (state === 'input-command') {
            this.command = null;
            document.querySelector('.overlay-container').innerHTML = '';
            this.commandContainer.style.display = 'none';
            this.input.focus();
        }
    }

    showCommandList(text) {
        const matchedCommands = this.apps.filter(option => option.command.startsWith(text));
        if (matchedCommands.length > 0) {
            this.menu.innerHTML = '';
            matchedCommands.forEach((option) => {
                const item = document.createElement('div');
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'space-between';
                const command = document.createElement('div');
                command.style.width = '80px';
                const description = document.createElement('div');
                command.innerHTML = option.command;
                description.style.color = '#9ca3af';
                description.innerHTML = option.description;
                description.style.fontSize = '10px';
                description.style.display = 'flex';
                description.style.alignItems = 'center';
                description.style.gap = '10px';

                if (option.quick) {
                    const hotKeys = document.createElement('div');
                    hotKeys.style.display = 'flex';
                    hotKeys.style.alignItems = 'center';
                    hotKeys.style.justifyContent = 'center';
                    hotKeys.style.gap = '3px';

                    const alt = document.createElement('div');
                    alt.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-command"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>`;
                    alt.style.color = '#9ca3af';
                    alt.style.fontSize = '10px';
                    alt.style.backgroundColor = '#6b7280';
                    alt.style.color = '#f9fafb';
                    alt.style.padding = '3px';
                    alt.style.width = '10px';
                    alt.style.height = '10px';
                    alt.style.borderRadius = '3px';
                    alt.style.display = 'flex';
                    alt.style.alignItems = 'center';
                    alt.style.justifyContent = 'center';

                    const quick = document.createElement('div');
                    quick.innerHTML = option.quick;
                    quick.style.color = '#9ca3af';
                    quick.style.fontSize = '10px';
                    quick.style.backgroundColor = '#6b7280';
                    quick.style.color = '#f9fafb';
                    quick.style.padding = '3px';
                    quick.style.width = '10px';
                    quick.style.height = '10px';
                    quick.style.borderRadius = '3px';
                    quick.style.display = 'flex';
                    quick.style.alignItems = 'center';
                    quick.style.justifyContent = 'center';

                    hotKeys.appendChild(alt);
                    hotKeys.appendChild(quick);
                    description.appendChild(hotKeys);
                }

                item.appendChild(command);
                item.appendChild(description);
                item.style.padding = '6px';
                item.style.paddingLeft = '12px'
                item.style.paddingRight = '12px'
                item.style.borderRadius = '5px';
                item.style.fontSize = '13px';

                item.addEventListener('click', () => {
                    if (option.composable) {
                        this.commandContainer.textContent = option.command;
                        this.setState('command', option.command)

                        if (option.icon) this.commandContainer.innerHTML = option.icon;
                        if (option.overlay) {
                            this.setState('overlay');

                            const calculatorOverlayContainer = document.querySelector('.overlay-container');
                            const overlayComponent = document.createElement('calculator-overlay');
                            overlayComponent.setAttribute('title', option.description);
                            if (!calculatorOverlayContainer.innerHTML) calculatorOverlayContainer.appendChild(overlayComponent);
                            const event = new CustomEvent('change-calculator-overlay', {
                                detail: {
                                    input: '',
                                    output: ''
                                }
                            });
                            document.dispatchEvent(event);
                        }
                    } else {
                        option.action();
                    }
                    this.menu.style.display = 'none';
                    this.input.focus();
                });
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#e5e7eb';
                    if (this.prefersDarkScheme) item.style.backgroundColor = '#4b5563';
                    item.style.cursor = 'pointer';
                });

                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                });
                this.menu.appendChild(item);
            });
            this.menu.style.display = 'block';
        } else {
            this.menu.style.display = 'none';
        }
    }


    createTask(taskId, taskText, taskDate) {
        localStorage.setItem('maxId', taskId);
        const htmlToShow = this.transformMDtoHTML(taskText);
        const onlyText = this.removeMarkdown(taskText);

        createOpenTask(htmlToShow, taskText, onlyText, taskDate, taskId);
        saveTasksToLocalStorage();
    }

    search(text) {
        if (!text) return;
        const encodedText = encodeURIComponent(text);
        const googleSearchUrl = `https://www.google.com/search?q=${encodedText}`;
        window.open(googleSearchUrl, '_blank');
        this.commandContainer.textContent = '';
        this.commandContainer.setAttribute('command', '');
        this.commandContainer.style.display = 'none';
        this.input.value = '';
    }


    sticky() {
        const container = document.querySelector('.sticky-notes');
        const sticky = document.createElement('sticky-note');
        container.appendChild(sticky);
        this.input.value = '';
    }

    clock() {
        const container = document.querySelector('.widgets');
        const clock = document.createElement('digital-clock');
        container.appendChild(clock);
        this.input.value = '';
    }

    timer(time) {
        if (!time) {
            this.commandContainer.textContent = '/timer';
            this.commandContainer.style.display = 'flex';
            return;
        }
        const timerComponents = document.querySelectorAll('timer-component');
        if (isNaN(time) || time <= 0) {
            this.toastTest(`Número de minutos no válido: ${time}`);
            return;
        }
        timerComponents.forEach(timer => timer.setAttribute('time', time));
        this.input.value = '';
    }


    calendar() {
        const container = document.querySelector('.app-hub');
        container.appendChild(document.createElement('calendar-view'));
        this.input.value = '';
    }

    counter() {
        const counter = document.querySelector('my-counter');
        counter.setAttribute('show', true);
        this.input.value = '';
    }

    stats() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        console.log(`Tareas abiertas: ${openTasks.length} \r\nTareas cerradas: ${closedTasks.length}\r\nPorcentaje tareas completadas: ${Math.round(closedTasks.length / (closedTasks.length + openTasks.length) * 100, 2)}%`)
        this.input.value = '';
    }

    deleteAll() {
        const acc = confirm('Si continuas se borrará las tareas actuales');

        if (acc) {
            removeAllTasks();
            localStorage.setItem('maxId', 0);
            localStorage.setItem('sticky-counter', 0);
            this.taskId = 0;

            document.querySelector('.open').innerHTML = '';
            document.querySelector('.closed').innerHTML = '';
            document.querySelector('.sticky-notes').innerHTML = '';
            const event = new CustomEvent('toast-message', {
                detail: ' Todas las tareas han sido borradas'
            });
            document.dispatchEvent(event);
        }
        this.input.value = '';
    }

    toastTest(text = 'Test de toast') {
        const event = new CustomEvent('toast-message', {
            detail: text
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
        this.input.value = '';
    }

    update() {
        forceReload();
    }

    len(text) {
        if (!text) return;
        return text.length;
    }

    toUpper(text) {
        if (!text) return;
        return text.trim().toUpperCase();
    }

    toLower(text) {
        if (!text) return;
        return text.trim().toLowerCase();
    }

    toTitleCase(text) {
        if (!text) return;
        return text.toLowerCase().replace(/(?:^|\s)\w/g, (letra) => letra.toUpperCase())
    }

    countWords(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    }


    gestionaTask(id, inputText, date) {
        const htmlToShow = this.transformMDtoHTML(inputText);
        const onlyText = this.removeMarkdown(inputText);
        if (id) {
            editTask(id, htmlToShow, inputText, onlyText, date);
            saveTasksToLocalStorage();
            this.editing = false;
        } else {
            createOpenTask(htmlToShow, inputText, onlyText, date, this.taskId++);
            localStorage.setItem('maxId', taskId);
            saveTasksToLocalStorage();
        }
    }

    import() {
        const input = document.getElementById("json_file_input");
        input.click();
        input.addEventListener("change", function () {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    const tasks = JSON.parse(reader.result);
                    //TODO validar el fichero
                    const acc = confirm('Si continuas se borrará las tareas actuales');
                    if (acc) {
                        rewriteTasksToLocalStorage(tasks.openTasks, tasks.closedTasks, tasks.stickyNotes);
                    }
                };
                reader.onerror = function () {
                    const event = new CustomEvent('toast-message', {
                        detail: 'Error al leer el archivo'
                    });
                    document.dispatchEvent(event);
                };
            }
        });
        this.input.value = '';
    }

    exportText() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `    - ${task.text}${task.status ? ' · Status: ' + task.status : ''}${task.due ? ' · Fecha planificada: ' + task.due : ''}${task.description ? '\r\n\t' + task.description.replace(/\n/g, '\n\t') : ''}`).join('\r\n');
        const closedTasksText = closedTasks.map(task => `    - ${task.text} [${task.date} - ${task.closed}]${task.description ? '\r\n\t' + task.description.replace(/\n/g, '\n\t') : ''}`).join('\r\n');
        const exporText = `Tareas abiertas (${openTasks.length}) \r\n${openTasksText} \r\n\r\nTareas cerradas (${closedTasks.length}) \r\n${closedTasksText}`;
        downloadFile(exporText, `Tareas ${new Date().toLocaleString()}.txt`);
        this.input.value = '';
    }

    exportMD() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const openTasksText = openTasks.map(task => `- [ ] ${task.text}${task.status ? '\`' + task.status + '\`' : ''}${task.due ? ' \`' + task.due + '\`' : ''}${task.description ? '\r\n\t\t' + task.description.replace(/\n/g, '\n\t\t') : ''}`).join('\n');
        const closedTasksText = closedTasks.map(task => `- [x] ${task.text} \`${task.date} - ${task.closed}\``).join('\n');
        const exportText = `## Tareas abiertas (${openTasks.length})\n\n${openTasksText}\n\n## Tareas cerradas (${closedTasks.length})\n\n${closedTasksText}`;
        downloadFile(exportText, `Tareas ${new Date().toLocaleString()}.md`);
        this.input.value = '';
    }

    export() {
        const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
        const closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
        const stickyNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];

        const data = JSON.stringify({
            openTasks: openTasks,
            closedTasks: closedTasks,
            stickyNotes: stickyNotes
        }, null, 2)

        downloadFile(data, `DailyDocketExport ${new Date().toLocaleString()}.json`);
        this.input.value = '';
    }

    hub() {
        document.querySelector('.app-hub').appendChild(document.createElement('app-hub'));
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
            .replace(/==([^*]+)==/g, '<span style="color: #2142b0; background-color: #dbeafe; border-radius: 5px; padding: 5px; padding-top: 2px;">$1</span>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\s+\"([^"]+)\"\)/g, '<a target="_blank" style="text-decoration: none; color: #2563eb;" href="$2" title="$3">$1</a>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a target="_blank" style="text-decoration: none; color: #2563eb;" href="$2">$1</a>')
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
            const event = new CustomEvent('toast-message', {
                detail: ' La entrada contiene caracteres no permitidos'
            });
            document.dispatchEvent(event);
            // throw new Error('La entrada contiene caracteres no permitidos');

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
                // throw new Error('Los paréntesis no están balanceados');
            }
        }
        if (parens !== 0) {
            // throw new Error('Los paréntesis no están balanceados');
        }
        // Si la entrada es segura, evaluar la expresión y devolver el resultado

        try {
            return eval(str)
        } catch (e) {

        }
        return;
    }
}

function downloadFile(texto, nombreArchivo) {
    const archivo = new Blob([texto], { type: 'text/plain' });
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(archivo);
    enlaceDescarga.download = nombreArchivo;
    enlaceDescarga.click();
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
const separateNumbersAndCharacters = str => {
    if (typeof str !== 'string' || str.trim().length === 0) {
        return '';
    }
    return str.replace(/([+*\/·\-])/g, ' $1 ').replace(/\*+/g, '·').replace(/\s+/g, ' ').trim();
}