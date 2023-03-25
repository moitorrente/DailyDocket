// Obtiene las tareas desde el localStorage (si existen)
let openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
let closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];

const createTasks = () => {
    document.querySelector('.open').innerHTML = '';

    let openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
    let closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];
    // const workspace = localStorage.getItem('current-workspace');

    // let openfiltered = openTasks.filter(task => task.workspace === workspace)
    openTasks.forEach(task => {
        const taskList = document.createElement('task-list');
        taskList.shadowRoot.querySelector('input').checked = task.completed;
        taskList.setAttribute('id', task.id);
        taskList.setAttribute('raw', task.raw);
        taskList.setAttribute('text', task.text);
        const title = document.createElement('span');
        title.setAttribute('slot', 'title');
        title.innerHTML = task.title;

        const date = document.createElement('span');
        date.setAttribute('slot', 'date');
        date.innerHTML = task.date;

        const status = document.createElement('span');
        status.setAttribute('slot', 'status');
        status.innerHTML = task.status;
        const due = document.createElement('span');
        due.setAttribute('slot', 'due');
        due.innerHTML = task.due;


        taskList.appendChild(title);
        taskList.appendChild(date);
        taskList.appendChild(status);
        taskList.appendChild(due);
        document.querySelector('.open').prepend(taskList);
    });

    document.querySelector('.closed').innerHTML = '';
    closedTasks.forEach(task => {
        const taskList = document.createElement('task-list');
        taskList.shadowRoot.querySelector('input').checked = task.completed
        taskList.setAttribute('id', task.id);
        taskList.setAttribute('raw', task.raw);
        taskList.setAttribute('text', task.text);
        const title = document.createElement('span');
        title.setAttribute('slot', 'title');
        title.innerHTML = task.title;
        const date = document.createElement('span');
        date.setAttribute('slot', 'date');
        date.innerHTML = task.date;
        taskList.appendChild(title);
        taskList.appendChild(date);
        document.querySelector('.closed').prepend(taskList);
    });
}
createTasks();

// Función para guardar las tareas en el localStorage
const saveTasksToLocalStorage = () => {
    localStorage.setItem('openTasks', JSON.stringify(openTasks));
    localStorage.setItem('closedTasks', JSON.stringify(closedTasks));
    const event = new CustomEvent('updated-storage', {
        detail: 'updates'
    });
    document.dispatchEvent(event);
    createTasks();
};

// Función para agregar una nueva tarea abierta
const addOpenTask = (title, raw, text, date, id) => {
    openTasks.push({ title, raw, text, date, id, completed: false, closed: null, status: null, description: null, due: null });
    logTaskEvent('TO_OPEN', id)
    // saveTasksToLocalStorage();
};
// this.editing, htmlToShow, inputText, onlyText, date.innerHTML
const editTask = (id, title, raw, text, date) => {
    const task = getTask(id);
    task.title = title;
    task.raw = raw;
    task.text = text;
    task.date = date;
    saveTasksToLocalStorage();
}

const getTaskDescription = (id) => {
    const task = getTask(id);
    return task.description;
}

const editDescription = (id, description) => {
    const task = getTask(id);
    task.description = description;
    saveTasksToLocalStorage();
}

const taskEditDue = (id, value) => {
    const task = getTask(id);
    task.due = value;
    saveTasksToLocalStorage();
}

const changeTaskStatus = (id, status) => {
    const task = getTask(id);
    task.status = status;
    saveTasksToLocalStorage();
}

const createOpenTask = (title, raw, text, date, id) => {
    openTasks.push({ title, raw, text, date, id, completed: false, closed: null });
    logTaskEvent('CREATE', id)
    // saveTasksToLocalStorage();
};

// Función para agregar una nueva tarea cerrada
const addClosedTask = (title, raw, text, date, id) => {
    closedTasks.push({ title, raw, text, date, id, completed: true, closed: new Date().toLocaleDateString('es-ES') });
    logTaskEvent('TO_CLOSE', id)
    // saveTasksToLocalStorage();
};


// // Función para actualizar una tarea abierta
// const updateOpenTask = (index, title, date, completed) => {
//     openTasks[index] = { title, date, completed };
//     saveTasksToLocalStorage();
// };

// // Función para actualizar una tarea cerrada
// const updateClosedTask = (index, title, date, completed) => {
//     closedTasks[index] = { title, date, completed };
//     saveTasksToLocalStorage();
// };

// Función para eliminar una tarea abierta
const removeOpenTask = (id) => {
    openTasks = openTasks.filter(task => task.id !== id);
    // saveTasksToLocalStorage();
};

// Función para eliminar una tarea cerrada
const removeClosedTask = (id) => {
    closedTasks = closedTasks.filter(task => task.id !== id);
    // saveTasksToLocalStorage();
};

const removeAllTasks = () => {
    openTasks = [];
    closedTasks = [];
    saveTasksToLocalStorage();
}

function getTask(id) {
    return openTasks.find(task => task.id === id) || closedTasks.find(task => task.id === id);
}

function getText(id) {
    const task = openTasks.find(task => task.id === id) || closedTasks.find(task => task.id === id);
    return task.text;
}

function getRaw(id) {
    const task = openTasks.find(task => task.id === id) || closedTasks.find(task => task.id === id);
    return task.raw;
}


function Event(type, task, timestamp) {
    this.type = type;
    this.task = task;
    this.timestamp = timestamp;
}

// Define una función para registrar eventos de las tareas
function logTaskEvent(eventType, task) {
    const timestamp = new Date().toISOString();
    const event = new Event(eventType, task, timestamp);
    const events = JSON.parse(localStorage.getItem('taskEvents')) || [];
    events.push(event);
    localStorage.setItem('taskEvents', JSON.stringify(events));
}