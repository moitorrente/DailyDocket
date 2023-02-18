// Obtiene las tareas desde el localStorage (si existen)
let openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
let closedTasks = JSON.parse(localStorage.getItem('closedTasks')) || [];


const createTasks = () => {
    document.querySelector('.open').innerHTML = '';
    openTasks.forEach(task => {
        const taskList = document.createElement('task-list');
        taskList.shadowRoot.querySelector('input').checked = task.completed;
        taskList.setAttribute('id', task.id);
        const title = document.createElement('span');
        title.setAttribute('slot', 'title');
        title.innerHTML = task.description;
        const date = document.createElement('span');
        date.setAttribute('slot', 'date');
        date.innerHTML = task.date;
        taskList.appendChild(title);
        taskList.appendChild(date);
        document.querySelector('.open').prepend(taskList);
    });

    document.querySelector('.closed').innerHTML = '';
    closedTasks.forEach(task => {
        const taskList = document.createElement('task-list');
        taskList.shadowRoot.querySelector('input').checked = task.completed
        taskList.setAttribute('id', task.id);
        const title = document.createElement('span');
        title.setAttribute('slot', 'title');
        title.innerHTML = task.description;
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
    createTasks();
};

// Función para agregar una nueva tarea abierta
const addOpenTask = (description, date, id) => {
    openTasks.push({ description, date, id, completed: false });
    saveTasksToLocalStorage();
};

// Función para agregar una nueva tarea cerrada
const addClosedTask = (description, date, id) => {
    closedTasks.push({ description, date, id, completed: true });
    saveTasksToLocalStorage();
};


// // Función para actualizar una tarea abierta
// const updateOpenTask = (index, description, date, completed) => {
//     openTasks[index] = { description, date, completed };
//     saveTasksToLocalStorage();
// };

// // Función para actualizar una tarea cerrada
// const updateClosedTask = (index, description, date, completed) => {
//     closedTasks[index] = { description, date, completed };
//     saveTasksToLocalStorage();
// };

// Función para eliminar una tarea abierta
const removeOpenTask = (id) => {
    openTasks = openTasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
};

// Función para eliminar una tarea cerrada
const removeClosedTask = (id) => {
    closedTasks = closedTasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
};

const removeAllTasks = () => {
    openTasks = [];
    closedTasks = [];
    saveTasksToLocalStorage();
}