// Create a class for the element
class PopUpInfo extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        const icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);

        const info = document.createElement('span');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        info.innerHTML = text;

        const iconElement = this.getAttribute('data-icon');
        icon.innerHTML = iconElement;

        this.taskId = this.getAttribute('data-task-id');

        const dataType = this.getAttribute('data-type');

        this.dataType = dataType;

        if (dataType === 'date') {
            const days = Number(this.getAttribute('data-number-days'));

            if (days < 0) icon.classList.add('red');
            if (days === 0) {
                icon.classList.add('orange');
                icon.innerHTML = `<svg width='10' height='10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>
              `;
            }
        }




        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');

        style.textContent = `.wrapper {
position: relative;
display: flex;
align-items: center;
}

.wrapper:hover{
cursor: pointer;
}


.red{
color: #dc2626;
}

.orange{
color: #fb923c;
}


.info {
font-size: 0.5rem;
width: 110px;
display: none;
background-color: #f9fafb;
border: 1px solid #d1d5db;
padding: 6px;
border-radius: 4px;
opacity: 0;
transition: 0.3s all;
position: absolute;
bottom: 15px;
left: -95px;
z-index: 113;
}

.icon{
display: flex;
align-items: center;
}

.due-translated {
color: #374151;
font-weight: 500;
margin-top: 5px;'
}

.icon:hover{
color: #4b5563;
font-weight: 500;
}


.icon:hover + .info, .icon:focus + .info {
opacity: 1;
display: inline-block;
}

.icon.red:hover{
color: #b91c1c;

}
.icon.orange:hover{
color: #ea580c;
}

@media (prefers-color-scheme: dark) {
.info {
background-color: #111827;
border: 1px solid #4b5563;
}
.due-translated {
color: #f3f4f6;
}
.icon:hover{
color: #f3f4f6;
}

.icon.red:hover{
color: #f87171;

}
.icon.orange:hover{
color: #fdba74;
}

.priority-icon{
    color: #f3f4f6; 
}

}`;
        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        if (this.dataType === 'date') {
            wrapper.addEventListener('click', () => {

                const taskDueDate = document.createElement('task-due-date');
                document.getElementById('mix-container').append(taskDueDate);

                const event = new CustomEvent('due-date-message', {
                    detail: getTask(Number(this.taskId))
                });
                document.dispatchEvent(event);
            });
        }

        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);