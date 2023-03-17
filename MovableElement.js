class MovableElement extends HTMLElement {
    constructor() {
      super();
      this.initialX = null;
      this.initialY = null;
      this.dragging = false;
      this.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.addEventListener('touchstart', this.onTouchStart.bind(this));
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('touchmove', this.onTouchMove.bind(this));
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
      document.addEventListener('touchend', this.onTouchEnd.bind(this));
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
  
  customElements.define('movable-element', MovableElement);
  