class StickyNote extends HTMLElement {
    constructor() {
        super();

        const template = `<style>
  /* Estilo para la barra de desplazamiento en general */
  ::-webkit-scrollbar {
    width: 2px;
    border-radius: 20px;

  }

  /* Estilo para el fondo de la barra de desplazamiento */
  ::-webkit-scrollbar-track {
    background-color: transparent;
    width: 2px;

  }

  /* Estilo para el "pulgar" de la barra de desplazamiento */
  ::-webkit-scrollbar-thumb {
    background-color: #eab308;
    border-radius: 2px;
    border: none;
  }

  /* Estilo para el "pulgar" de la barra de desplazamiento cuando se está arrastrando */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ca8a04;
  }

  .sticky-note {
    width: 160px;
    height: 170px;
    padding-right: 5px;
    border-radius: 5px;
    background-color: #fef9c3;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    overflow: hidden;
  }

  .close-btn {
    color: #eab308;
    visibility: hidden;
    transition: color 0.3s ease;
  }


  .close-btn:hover {
    color: #ca8a04;
  }

  .sticky-note .header {
    display: flex;
    justify-content: flex-end;
  }

  .header:hover {
    cursor: move;
  }

  .sticky-note .header .close-btn {
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .sticky-note .content {
    margin-top: 0px;
    overflow: auto;
    height: 125px;
    padding: 0 10px 0 10px;
  }

  .content {
    font-size: 12px;
    color: #92400e;
    overflow-y: auto;
  }

  .content::selection {
    background-color: #92400e;
    color: white;
  }



  .footer {
    display: none;
    padding-left: 5px;
  }

  /* .sticky-note:hover .footer {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
  } */

  .sticky-note:hover .close-btn {
    visibility: visible;
  }

  .content:focus {
    outline: 0;
  }

  button {
    border: 1px solid red;
    padding: 0;
    margin: 0;
    align-items: center;
    background-color: transparent;
  }

  button:hover {
    background-color: blue;
  }


  @media (prefers-color-scheme: dark) {
    .sticky-note {
      background-color: #475569;
    }

    .close-btn {
      color: #94a3b8;
    }

    .close-btn:hover {
      color: #cbd5e1;
    }

    .content {
      color: #cbd5e1
    }

    .content::selection {
      background-color: #64748b;
    }
  }
</style>
<div class="sticky-note">
  <div class="header">
    <button class="close-btn"><svg width="15" height="15" viewBox="0 0 15 15" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg></button>
  </div>
  <div class="content" contenteditable>
  </div>
  <div class="footer">
    <button>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.10505 12C4.70805 12 4.4236 11.912 4.25171 11.736C4.0839 11.5559 4 11.2715 4 10.8827V4.11733C4 3.72033 4.08595 3.43588 4.25784 3.26398C4.43383 3.08799 4.71623 3 5.10505 3C6.42741 3 8.25591 3 9.02852 3C10.1373 3 11.0539 3.98153 11.0539 5.1846C11.0539 6.08501 10.6037 6.81855 9.70327 7.23602C10.8657 7.44851 11.5176 8.62787 11.5176 9.48128C11.5176 10.5125 10.9902 12 9.27734 12C8.77742 12 6.42626 12 5.10505 12ZM8.37891 8.00341H5.8V10.631H8.37891C8.9 10.631 9.6296 10.1211 9.6296 9.29877C9.6296 8.47643 8.9 8.00341 8.37891 8.00341ZM5.8 4.36903V6.69577H8.17969C8.53906 6.69577 9.27734 6.35939 9.27734 5.50002C9.27734 4.64064 8.48047 4.36903 8.17969 4.36903H5.8Z"
          fill="currentColor"></path>
      </svg>
    </button>
  </div>
</div>`;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;

        const closeButton = shadowRoot.querySelector('.close-btn');
        closeButton.addEventListener('click', () => this.remove());

        const header = shadowRoot.querySelector('.header');


        header.addEventListener('mousedown', this.onMouseDown.bind(this));
        header.addEventListener('touchstart', this.onTouchStart.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('touchmove', this.onTouchMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    connectedCallback() {

        this.initialX = null;
        this.initialY = null;
        this.dragging = false;
        this.style.position = 'absolute';
        this.style.zIndex = 99;
    }

    onMouseDown(event) {
        this.initialX = event.clientX - this.offsetLeft;
        this.initialY = event.clientY - this.offsetTop;
        this.dragging = true;
    }

    onTouchStart(event) {
        this.initialX = event.touches[0].clientX - this.offsetLeft;
        this.initialY = event.touches[0].clientY - this.offsetTop;
        this.dragging = true;
    }

    onMouseMove(event) {
        if (this.dragging) {

            const newX = event.clientX - this.initialX;
            const newY = event.clientY - this.initialY;

            this.style.left = newX + 'px';
            this.style.top = newY + 'px';
        }
    }

    onTouchMove(event) {
        if (this.dragging) {
            const newX = event.touches[0].clientX - this.initialX;
            const newY = event.touches[0].clientY - this.initialY;
            this.style.left = newX + 'px';
            this.style.top = newY + 'px';
        }
    }

    onMouseUp() {
        this.dragging = false;
    }

    onTouchEnd() {
        this.dragging = false;
    }
}

customElements.define('sticky-note', StickyNote);
