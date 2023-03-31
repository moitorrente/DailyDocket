class WeightCard extends HTMLElement {
    constructor() {
        super();
        this.weight = 74.3;
        this.date = '2023-03-05';
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>
  :host {
    display: inline-block;
    border: 1px solid #dee2e6;
    padding: .5rem;
    border-radius: 5px;
    width: 258px;
    margin-top: 10px;
  }

  button {
    display: none;
  }

  :host(:hover) button {
    visibility: visible;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 3px;
  }

  .weight-value {
    font-weight: bold;
  }

  button {
    visibility: hidden;
    display: flex;
    background-color: transparent;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    transition: background-color .3s ease;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    background-color: #dee2e6;
    cursor: pointer;
  }
</style>
<div class="container">
  <div class="weight-value">${this.weight}kg</div>
  <div class="date-value">${this.date}</div>
  <button id="edit"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg></button>`;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#edit').addEventListener('click', () => {
            const newWeight = prompt('Introduce el nuevo peso (kg):');
            if (newWeight !== null && !isNaN(newWeight)) {
                this.weight = newWeight;
                this.shadowRoot.querySelector('.weight-value').textContent = `${this.weight} kg`;
            }
        });

        this.shadowRoot.querySelector('#send').addEventListener('click', () => {
            // Aquí se puede enviar el peso a una API utilizando fetch o alguna librería externa
            alert(`Peso ${this.weight} kg enviado a la API`);
        });
    }
}

customElements.define('weight-card', WeightCard);