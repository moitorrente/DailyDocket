class AlertComponent extends HTMLElement {
    constructor() {
        super();



        const template = `<style>
  :host {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  svg {
    margin-right: 8px;
    width: 18px;
    height: 18px;
    fill: #4b5563;
  }

  .tooltip {
    position: absolute;
    top: 100%;
    width: 300px;
    left: -150px;
    transform: translateX(-50%);
    padding: .8rem;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    color: #374151;
    font-size: 0.7rem;
    border-radius: 0.2rem;
    display: none;
  }
  


  .counter {
    position: absolute;
    top: -5px;
    right: -2px;
    background-color: #1e3a8a;
    color: #e5e7eb;
    font-size: 8px;
    font-weight: 800;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }


  @media (prefers-color-scheme: dark) {
    .counter {
      background-color: #e5e7eb;
      color: #1f2937;
    }

    svg {
      fill: #e5e7eb;
    }

    svg:hover{
        fill: #f9fafb;
    }

    .tooltip {
        background-color: #111827;
        border: 1px solid #4b5563;
        color: #f3f4f6;
    }

  }
</style>
<div>
  <svg width="10" height="10" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"></path>
    </path>
  </svg>
  <div class="counter"></div>
  <div class="tooltip">Contenido</div>
</div>`;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;

        this.counter = this.shadowRoot.querySelector('.counter');
        this.svg = this.shadowRoot.querySelector('svg');
        this.tooltipDiv = this.shadowRoot.querySelector('.tooltip');
    }

    connectedCallback() {

        this.svg.addEventListener("mouseenter", () => {
            this.tooltipDiv.style.display = "block";
        });

        // Add event listener for mouse leave svg
        this.svg.addEventListener("mouseleave", () => {
            this.tooltipDiv.style.display = "none";
        });
        const dueToday = checkDueToday();
        if (!dueToday.length) {
            this.style.display = 'none'
        } else {
            this.style.display = 'flex'
            this.counter.textContent = dueToday.length;
            this.tooltipDiv.innerHTML = '<div style="margin-bottom: 15px; font-weight: bold;">Tareas que vencen hoy</div> <ul">' + dueToday.map(task => task.title).reduce((prev, curr) => prev + '<li style="margin-top: 15px;">' + curr + '</li>', '') + '</ul>'

        }
        const _this = this;

        document.addEventListener('updated-storage', (event) => {
            const dueToday = checkDueToday();
            if (!dueToday.length) {
                _this.style.display = 'none'
            } else {
                _this.style.display = 'flex';
                _this.counter.textContent = dueToday.length;
                _this.tooltipDiv.innerHTML = '<div style="margin-bottom: 10px; font-weight: bold;">Tareas que vencen hoy</div> <ul">' + dueToday.map(task => task.title).reduce((prev, curr) => prev + '<li style="margin-top: 15px;">' + curr + '</li>', '') + '</ul>'
            }
        });
    }
}

customElements.define('alert-component', AlertComponent);

function compareDate(dateString) {
    const parts = dateString.split("/");
    return new Date().getDate() === new Date(parts[2], parts[1] - 1, parts[0]).getDate();
}

function checkDueToday() {
    const openTasks = JSON.parse(localStorage.getItem('openTasks')) || [];
    return openTasks.map(task => {
        return task.due ? compareDate(task.due) ? task : '' : false;
    }).filter(x => x);



}
