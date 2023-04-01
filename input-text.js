class InputText extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.style.width = '100%';

        const mainContainer = document.createElement('div');
        mainContainer.style.width = '100%';
        mainContainer.style.display = 'flex';
        mainContainer.style.gap = '5px';

        const input = document.createElement('input');
        this.input = input;
        this.taskId = localStorage.getItem('maxId') || 0;

        const style = document.createElement('style');
        style.innerHTML = `
        input::selection {
            background-color: #64748b;
            color: white;
          }

  ::-webkit-scrollbar {
    width: 4px; /* Ancho de la barra de desplazamiento */
}

  ::-webkit-scrollbar-track {
    background-color: transparent; /* Color del fondo de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d1d5db; /* Color de la barra de desplazamiento */
    border-radius: 20px; /* Radio de la esquina de la barra de desplazamiento */
  }

  @media (prefers-color-scheme: dark) {
    ::-webkit-scrollbar {
        width: 2px; /* Ancho de la barra de desplazamiento */
        background-color: transparent;
      }
    
      ::-webkit-scrollbar-track {
        background-color: transparent; /* Color del fondo de la barra de desplazamiento */
      }
    
      ::-webkit-scrollbar-thumb {
        background-color: #6b7280; /* Color de la barra de desplazamiento */
        border-radius: 20px; /* Radio de la esquina de la barra de desplazamiento */
      }

      input::selection {
        background-color: #64748b;
      }
  }
`;
        container.appendChild(style);

        localStorage.setItem('mode', 'dark');

        input.type = 'text';
        input.style.border = 'none';
        input.style.backgroundColor = '#e5e7eb';
        input.style.color = '#4b5563';
        input.style.borderRadius = '5px';
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
        menu.style.fontSize = '13px';
        menu.style.top = '175px';
        menu.style.color = '#6b7280';
        menu.style.padding = '6px';
        menu.style.width = '100%';
        menu.style.marginTop = '5px'
        // menu.style.maxWidth = '300px';
        menu.style.outline = 'none';
        menu.style.boxSizing = 'border-box';
        menu.style.maxHeight = '40vh';
        menu.style.overflow = 'auto';
        menu.style.backgroundColor = '#f3f4f6';
        menu.style.display = 'none';
        menu.style.borderRadius = '5px';
        menu.style.boxShadow = 'rgb(0 0 0 / 7%) 10px 10px 10px 0px';
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
            { command: "/test", description: 'Test de toast', action: (message) => this.toastTest(message), composable: true },
            { command: "/counter", description: 'Crea un contador', action: () => this.counter(), quick: 'C' },
            { command: "/delete", description: 'Borra todas las tareas', action: () => this.deleteAll() },
            { command: "/update", description: 'Actualiza la aplicación', action: () => this.update(), quick: 'U' },
            { command: "/version", description: 'Consulta la versión de la aplicación', action: () => this.toastTest('Version: 1.3') },
            { command: "/export", description: 'Exporta las tareas en json', action: () => this.export(), quick: 'E' },
            { command: "/import", description: 'Importa las tareas desde json', action: () => this.import() },
            { command: "/text", description: 'Exporta a txt', action: () => this.exportText() },
            { command: "/md", description: 'Exporta a md', action: () => this.exportMD() },
            { command: "/clock", description: 'Muestra la hora', action: () => this.clock() },
            { command: "/sidebar", description: 'Muestra sidebar', action: () => this.sidebar() },
            { command: "/stats", description: 'Muestra estadísticas', action: () => this.stats() },
        ];



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
                // input.value = '';
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
                        app.action()
                    }
                })
            }
        });

        input.addEventListener('keydown', (event) => {
            if ((event.keyCode === 46 || event.which === 46 || event.keyCode === 8 || event.which === 8) && commandContainer.textContent && input.value.length === 0) {
                commandContainer.style.display = 'none';
                commandContainer.textContent = '';
            }

            if (commandContainer.textContent && event.keyCode === 13 && input.value.length) {
                apps.filter(app => {
                    if (app.command === commandContainer.textContent) {
                        app.action(input.value);
                        commandContainer.style.display = 'none';
                        commandContainer.textContent = '';
                    }
                })
            }
        });

        input.addEventListener('keyup', (event) => {
            menu.style.display = 'none';
            const text = event.target.value.trim();

            if (event.keyCode === 38 && input.value === '') {
                const lastCommand = localStorage.getItem('last-command');
                if (lastCommand) input.value = lastCommand;
            } else if (event.keyCode === 13 && text.length) {
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
                    apps.filter(app => {
                        if (app.command === command) {
                            if (app.composable) {
                                commandContainer.textContent = app.command;
                                commandContainer.style.display = 'block';
                                input.value = '';
                            }
                            app.action(param);
                        }
                    })
                } else {
                    if (text.startsWith('=')) {
                        inputText = `${inputText.slice(1)} = ${this.calculadora(inputText.slice(1))}`;
                    }
                    const htmlToShow = this.transformMDtoHTML(inputText);
                    const onlyText = this.removeMarkdown(inputText);
                    if (this.editing) {
                        editTask(this.editing, htmlToShow, inputText, onlyText, date.innerHTML);
                        saveTasksToLocalStorage();
                        this.editing = false;
                    } else {
                        createOpenTask(htmlToShow, inputText, onlyText, date.innerHTML, this.taskId);
                        saveTasksToLocalStorage();
                    }
                }
                // input.value = '';
            } else if (text.startsWith('/')) {
                // Mostrar menú de comandos que coinciden con el texto ingresado

                const exactMatch = apps.filter(option => option.command === (text))[0]
                if (exactMatch?.composable) {
                    commandContainer.textContent = exactMatch.command;
                    commandContainer.style.display = 'block';
                    input.value = '';
                    return;
                }

                if (exactMatch) {
                    exactMatch.action();
                    input.value = '';
                    menu.style.display = 'none';
                    input.focus();
                    return;
                }

                const matchedCommands = apps.filter(option => option.command.startsWith(text));
                if (matchedCommands.length > 0) {
                    menu.innerHTML = '';
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
                            alt.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.5 12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.72386 11.5 8 11.5C8.27614 11.5 8.5 11.7239 8.5 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12.5 8C12.5 8.27614 12.2761 8.5 12 8.5C11.7239 8.5 11.5 8.27614 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16.5 8C16.5 8.27614 16.2761 8.5 16 8.5C15.7239 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.7239 7.5 16 7.5C16.2761 7.5 16.5 7.72386 16.5 8Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16.5 12C16.5 12.2761 16.2761 12.5 16 12.5C15.7239 12.5 15.5 12.2761 15.5 12C15.5 11.7239 15.7239 11.5 16 11.5C16.2761 11.5 16.5 11.7239 16.5 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M7.75 16.25H16.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            `;
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
                        item.style.borderRadius = '8px';
                        item.style.fontSize = '13px';

                        item.addEventListener('click', () => {
                            if (option.composable) {
                                commandContainer.textContent = option.command;
                                commandContainer.style.display = 'block';
                                input.value = '';
                            } else {
                                option.action();
                            }

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

        const commandContainer = document.createElement('div');
        this.commandContainer = commandContainer;
        commandContainer.textContent = '';
        commandContainer.style.width = '50px';
        commandContainer.style.display = 'none';
        commandContainer.style.border = 'none';
        commandContainer.style.backgroundColor = '#e5e7eb';
        commandContainer.style.color = '#4b5563';
        if (prefersDarkScheme.matches) {
            commandContainer.style.backgroundColor = '#374151';
            commandContainer.style.color = '#f9fafb';
        }
        commandContainer.style.borderRadius = '5px';
        commandContainer.style.padding = '12px';
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
            // this.input.value = '/timer ';
            this.commandContainer.textContent = '/timer';
            this.commandContainer.style.display = 'block';
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
            this.taskId = 0;

            document.querySelector('.open').innerHTML = '';
            document.querySelector('.closed').innerHTML = '';
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
        this.input.value = '';
        forceReload();
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
                        rewriteTasksToLocalStorage(tasks.openTasks, tasks.closedTasks);
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

        const data = JSON.stringify({
            openTasks: openTasks,
            closedTasks: closedTasks
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
            .replace(/==([^*]+)==/g, '<span style="color: #2142b0; background-color: #dbeafe; border-radius: 5px; padding: 5px; padding-top: 2px; padding-bottom: 2px;">$1</span>')
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
    // const event = new CustomEvent('toast-message', {
    //     detail: 'Tareas descargadas'
    // });
    // document.dispatchEvent(event);
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
