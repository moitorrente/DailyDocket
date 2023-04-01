class AppHub extends HTMLElement {
    constructor() {
        super();
        // Crear el shadow DOM
        const shadowRoot = this.attachShadow({ mode: "open" });

        // Crear la lista de aplicaciones
        const stickyIcon = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9.25H13.75V5"></path>
      </svg>
      `;
        const clockIcon = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.5"></circle>
        <path stroke="currentColor" stroke-width="1.5" d="M12 8V12L14 14"></path>
      </svg>
      
      `;
        const countIcon = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8.75003V15.25"></path>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 12L8.75 12"></path>
      </svg>
      `;
      const exportIcon = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 4.75"></path>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 10.75L12 14.25L15.25 10.75"></path>
    </svg>
    `;

    const importIcon = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 5"></path>
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 8.25L12 4.75L15.25 8.25"></path>
  </svg>
  `

    const textIcon = `
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9.25H13.75V5"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 15.25H14.25"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 12.25H14.25"></path>
</svg>

    `;

    const input = document.querySelector('input-text');
        const appList = [
            { name: "Sticky note", icon: stickyIcon, action: () => document.querySelector('.sticky-notes').appendChild(document.createElement('sticky-note')) },
            { name: "Reloj", icon: clockIcon, action: () => input.clock() },
            { name: "Contador", icon: countIcon, action: () => input.counter() },
            { name: "Exportar", icon: exportIcon, action: () => input.export() },
            { name: "Importar", icon: importIcon, action: () => input.import() },
            { name: "Texto", icon: textIcon, action: () => input.exportText() },
        ];

        // Crear el estilo para los botones
        const style = `
        <style>

        .modal {
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.4);
          }
        
          .modal-content {
            align-items: center;
            background-color: #f3f4f6;
            border: 1px solid #9ca3af;
            margin: 10% auto;
            padding: 15px;
            border-radius: 5px;
            width: 80%;
            max-width: 410px;
          }

          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(30%, 1fr)); /* Columnas de ancho flexible */
            grid-auto-rows: minmax(100px, auto); /* Ajusta la altura de las filas según su contenido, con un mínimo de 100px */
            gap: 15px; /* Agrega un espacio de 20px entre las celdas */
          }
          
          .grid-item {
            border-radius: 5px;
            padding-bottom: 100%; /* Establece una relación de aspecto cuadrada */
          }
        
          .modal-title {
            display: flex;
            align-items: center;
            gap: 5px;
            flex-grow: 1;
            font-size: medium;
            font-weight: 500;
            color: #6b7280;
            margin-left: 10px;
            margin-bottom: 10px;
          }
        
          .modal-title-container {
            display: flex;
            align-items: center;
          }

          .button {
            align-items: center;
            justify-content: center;
            background-color: #e5e7eb;
            border: none;
            font-size: 10px;
            line-height: 20px;
            color: #374151;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
            padding: 20px;
          }
          
          .button:focus,
          .button:hover {
            background-color: #6b7280;
            color: #e5e7eb;
          }
          
          .button svg {
            width: 24px;
            height: 24px;
          }

          @media (prefers-color-scheme: dark) {
            .modal-content {
                background-color: #111827;
                border: 1px solid #4b5563;
              }

              .modal-title {
                color: #e5e7eb;
              }

              .button{
                background-color: #1f2937;
                color: #f9fafb;
              }

              .button:focus,
              .button:hover {
                background-color: #374151;
              }
          }
        </style>
      `;

        // Crear los botones con los iconos y los nombres de las aplicaciones
        const buttons = appList.map((app, index) => {
            const button = `
          <button class="button grid-element" tabindex="${index + 1}">
              ${app.icon}
            <div>${app.name}</div>
          </button>
        `;
            return button;
        });

        // Agregar los elementos al shadow DOM
        shadowRoot.innerHTML = `
        ${style}
        <div class="modal">
    <div class="modal-content">
    <div class="modal-title-container">
      <div class="modal-title"> 
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 8L12 4.75L19.25 8L12 11.25L4.75 8Z"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 16L12 19.25L19.25 16"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8V16"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 8V16"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11.5V19"></path>
</svg>

      App hub</div>
    </div>

    <div class="grid-container">
    ${buttons.join('')}
    </div>

  </div>
</div>
      `;

        // Añadir el evento click a cada botón
        const modal = shadowRoot.querySelector(".modal");
        appList.forEach((app, index) => {
            const button = modal.querySelector(`.button:nth-of-type(${index + 1})`);
            button.addEventListener("click", () => {
                this.remove(); // Eliminar el componente del DOM
                app.action(); // Ejecutar la acción de la aplicación
            });
        });

        this.shadowRoot.addEventListener('click', function (event) {
            if (!event.target.closest('.modal-content')) {
                modal.style.display = 'none';
            }
        });
    }

    connectedCallback(){
        this.focus();
    }

}



// Definir el elemento personalizado
customElements.define("app-hub", AppHub);
