class CalculatorOverlay extends HTMLElement {
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
        padding: 10px;
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
        transform: translateX(-50%);
        color: #9ca3af;
    }

    .pill {
        font-size: x-small;
        color: #4b5563;
        background-color: #f3f4f6;
        padding: 5px;
        border-radius: 5px;
    }

    .border-right {
        border-right: 1px solid #d1d5db;
    }

    .title {
        margin-left: 10px;
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
            color: #9ca3af;
        }
    }
</style>
<div class="wrapper">
    <span class="title">Calculadora</span>
    <div class="container">
        <div class="card border-right">
            <div class="input" style="font-size: x-large; font-weight: 600;"></div>
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
        <div class="card">
            <div class="output" style="font-size: x-large; font-weight: 600;"></div>
            <div class="pill">
                Output
            </div>
        </div>
    </div>
</div>`;

        this.input = this.shadowRoot.querySelector('.input');
        this.output = this.shadowRoot.querySelector('.output');
        this.changeOverlay = this.changeOverlay.bind(this);
    }

    changeOverlay(event) {
        const { input, output } = event.detail;
        this.input.textContent = separateNumbersAndCharacters(input);;
        this.output.textContent = output;
    }

    connectedCallback() {
        document.addEventListener('change-calculator-overlay', this.changeOverlay)
    }

    disconnectedCallback() {
        document.removeEventListener('change-calculator-overlay', this.changeOverlay);
    }
}
customElements.define('calculator-overlay', CalculatorOverlay);

const separateNumbersAndCharacters = str => {
    if (typeof str !== 'string' || str.trim().length === 0) {
        return '';
    }
    return str.replace(/([+*\/·\-])/g, ' $1 ').replace(/\*+/g, '·').replace(/\s+/g, ' ').trim();
}
