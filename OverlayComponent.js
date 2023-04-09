class OverlayComponent extends HTMLElement {
    constructor() {
        super();

        // Crear el shadow DOM y agregar el contenido HTML y CSS
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `<style>
    /* Estilos CSS */
    .wrapper {
        background-color: #f3f4f6;
        color: #4b5563;
        padding-left: 30px;
        padding-right: 30px;
        padding: 5px;
        padding-top: 5px;
        border-radius: 5px;
        margin-top: 5px;
        font-size: small;
        font-weight: 600;
    }

    .container {
        display: flex;
        color: #374151;
        background-color: #e5e7eb;
        align-items: center;
        justify-content: space-around;
        padding: 0px;
        border-radius: 5px;
        margin-top: 5px;
    }

    .card {
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        padding-top: 20px;
        gap: 15px;
        width: 100%;
        height: 100%;
    }

    .separator {
        position: absolute;
        background-color: #e5e7eb;
        left: 50%;
        border-radius: 3px;
        display: flex;
        align-items: center;
        transform: translateX(-50%);
        height: 40px;
        color: #9ca3af;
    }

    .pill {
        font-size: 8px;
        color: #4b5563;
        background-color: #f3f4f6;
        padding: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        border-radius: 3px;
    }

    .border-right {
        border-right: 1px solid #d1d5db;
    }

    .title {
        margin-left: 10px;
    }

    .output-card:hover {
        cursor: pointer;
        border-radius: 0 5px 5px 0;
        background-color: #d1d5db;
    }

    .icon {
        color: #9ca3af;
        font-size: 10px;
        background-color: #6b7280;
        color: #f9fafb;
        padding: 3px;
        width: 10px;
        height: 10px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (prefers-color-scheme: dark) {
        .wrapper {
            background-color: #374151;
            color: #f3f4f6;
        }

        .container {
            color: #f3f4f6;
            background-color: #1f2937;
        }

        .border-right {
            border-right: 1px solid #374151;
        }

        .pill {
            color: #d1d5db;
            background-color: #374151;
        }

        .separator {
            position: absolute;
            background-color: #1f2937;
            left: 50%;
            transform: translateX(-50%);
            color: #f3f4f6;
        }

        .output-card:hover {
            background-color: #111827;
        }

    }
</style>
<div class="wrapper">
    <span class="title"></span>
    <div class="container">
        <div class="card border-right">
            <div class="input" style="font-size: large; font-weight: 600;"></div>
            <div class="pill">
                Input
            </div>
        </div>
        <div class="separator">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
        </div>
        <div class="card output-card">
            <div class="output" style="font-size: large; font-weight: 600;"></div>
            <div class="pill">
                Output
            </div>
        </div>
    </div>
    <div style="align-items: center; gap: 5px; font-size: 8px; display: flex; justify-content: end; margin-top: 5px;">
        <div class="copy">
            Copiar resultado
        </div>
        <div class="icon">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </div>

    </div>

</div>`;

        this.input = this.shadowRoot.querySelector('.input');
        this.output = this.shadowRoot.querySelector('.output');
        this.outputCard = this.shadowRoot.querySelector('.output-card');
        this.changeOverlay = this.changeOverlay.bind(this);
        this.outputCard.addEventListener('click', this.copyOutput.bind(this))
        this.icon = this.shadowRoot.querySelector('.icon');
        this.copy = this.shadowRoot.querySelector('.copy');
    }

    copyOutput() {
        copyTextToClipboard(this.output.textContent);
        const self = this;
        this.icon.style.backgroundColor = '#059669';
        this.copy.textContent = '¡Copiado!'
        this.icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(function () {
            self.icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
            self.copy.textContent = 'Copiar resultado'
            self.icon.style.backgroundColor = '#6b7280';

        }, 1200);
    }

    changeOverlay(event) {
        const { input, output } = event.detail;
        this.input.textContent = input;
        if (output) this.output.textContent = output;
    }

    connectedCallback() {
        document.addEventListener('change-overlay', this.changeOverlay);
        const title = this.getAttribute('title');
        this.shadowRoot.querySelector('.title').textContent = title;
    }

    disconnectedCallback() {
        document.removeEventListener('change-overlay', this.changeOverlay);
    }
}
customElements.define('overlay-component', OverlayComponent);

function copyTextToClipboard(text) {
    // Create a temporary text element
    const tempElement = document.createElement("textarea");
    tempElement.value = text;

    // Add the element to the document
    document.body.appendChild(tempElement);

    // Select the text
    tempElement.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary element from the document
    document.body.removeChild(tempElement);
}
