class TimerComponent extends HTMLElement {
  static get observedAttributes() {
    return ['time'];
  }
  constructor() {
    super();

    this.innerHTML = `<div class="timer-container hidden">
    <div class="pie" style="--p:0;--c:#9ca3af;--b:4px"></div>
  <div class="timer">15:00</div>
  <div class="navigation">

    <button id="stop">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</div>`;

    this.timerContainer = this.querySelector('.timer-container');
    this.chart = this.querySelector('#chart')
    this.timerEl = this.querySelector('.timer');
    this.stopBtn = this.querySelector('#stop');

    this.timerEl.addEventListener('click', this.startTimer.bind(this));
    this.stopBtn.addEventListener('click', this.stopTimer.bind(this));

    this.running = false;
    this.time = 15 * 60;
  }

  connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<style>
  @property --p {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }

  .pie {
    --p: 20;
    --b: 22px;
    --c: darkred;
    --w: 20px;

    width: var(--w);
    aspect-ratio: 1;
    position: relative;
    display: inline-grid;
    place-content: center;
  }

  .pie:before,
  .pie:after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  .pie:before {
    inset: 0;
    background:
      radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b) no-repeat,
      conic-gradient(var(--c) calc(var(--p)*1%), #111827 0);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
    mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
  }

  .pie:after {
    inset: calc(50% - var(--b)/2);
    background: var(--c);
    transform: rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
  }

  .animate {
    animation: p 1s .5s both;
  }

  .no-round:before {
    background-size: 0 0, auto;
  }

  .no-round:after {
    content: none;
  }

  @keyframes p {
    from {
      --p: 0
    }
  }


  .timer-container {
    font-family: 'Roboto Mono', monospace;
    max-width: 170px;
    background-color: #f3f4f6;
    color: #6b7280;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 3px;
    gap: 6px;
  }

  .timer {
    display: flex;
    flex-grow: 1;
    font-size: 20px;
    border-radius: 5px;
    font-weight: 500;
    justify-content: center;
    /* centra horizontalmente */
    align-items: center;
    /* centra verticalmente */
    text-align: center;
    /* centra el texto dentro del div */
  }

  .timer:hover {
    background-color: #e5e7eb;
    cursor: pointer;
  }

  .navigation {
    display: flex;
    justify-content: center;
    gap: 3px;
  }

  button {
    align-items: center;
    background-color: #f3f4f6;
    color: #6b7280;
    border: none;
    border-radius: 5px;
    font-size: 6px;
    padding: 3px;
    cursor: pointer;
    transition: background-color .3s ease;
  }

  button:hover {
    background-color: #e5e7eb;
    color: #4b5563;
  }

  .hidden {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    .timer-container {
      background-color: #374151;
      color: #9ca3af;
    }

    .timer:hover {
      background-color: #4b5563;
      cursor: pointer;
      color: #e5e7eb;
    }

    button {
      background-color: #374151;
      color: #9ca3af;
      transition: background-color .3s ease;
    }

    button:hover {
      background-color: #4b5563;
      color: #e5e7eb;
    }
  }
</style>`);

  }

  startTimer() {
    const pie = document.querySelector('.pie');
    if (this.running) {
      clearInterval(this.intervalId);
    } else {
      this.intervalId = setInterval(() => {
        if (this.time > 0) {
          this.time--;
          this.timerEl.textContent = secondsToTime(this.time);


          pie.style.setProperty('--p', ((this.originalTime - this.time) / this.originalTime * 100));
        } else {
          clearInterval(this.intervalId);
          this.running = false;
          if ('Notification' in window) {
            // Pedir permiso para mostrar notificaciones
            Notification.requestPermission().then(function (permission) {

              // Si el usuario da permiso
              if (permission === "granted") {
                // Crear la notificación
                const notification = new Notification("Fin del timer", {
                  body: "Se ha finalizado el timer",
                  icon: "icon.svg"
                });

                // Mostrar la notificación
                notification.onclick = function () {
                  window.focus();
                  notification.close();
                };
              }
            });
          }
        }
      }, 1000);
    }
    this.running = !this.running;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'time') {
      this.stopTimer();
      this.time = parseInt(newValue) * 60;
      this.timerEl.textContent = secondsToTime(this.time);
      this.running = false;
      this.show();
      this.startTimer();
      this.originalTime = this.time;
    }
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.hide();
  }

  hide() {
    this.timerContainer.classList.add("hidden");
  }

  show() {
    this.timerContainer.classList.remove("hidden");
  }


}

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${hours < 10 ? `0${hours}` : `${hours}`}:` : '';
  const formattedMinutes = `${minutes < 10 ? `0${minutes}` : `${minutes}`}:`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}

window.customElements.define('timer-component', TimerComponent);
