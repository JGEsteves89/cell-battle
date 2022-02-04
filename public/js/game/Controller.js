import Vector from './Vector.js';
export default class Controller {
    constructor(canvas, camera) {
        this.leftMouseDown = false;
        this.rightMouseDown = false;
        this.movePlayerHandle = (clikedPoint) => { };
        this.dragCameraHandle = (drag) => { };
        this.camera = camera;
        this.setupListeners(canvas);
    }
    setMovePlayerHandle(handle) {
        this.movePlayerHandle = handle;
    }
    setDragCameraHandle(handle) {
        this.dragCameraHandle = handle;
    }
    setupListeners(canvas) {
        canvas.addEventListener('mousedown', (e) => {
            if (typeof e === 'object') {
                switch (e.button) {
                    case 0: // 'Left button clicked.
                        this.leftMouseDown = true;
                        const clikedPoint = new Vector(e.offsetX, e.offsetY).add(this.camera.pos);
                        this.movePlayerHandle(clikedPoint);
                        e.preventDefault();
                        break;
                    case 1: // Middle button clicked.
                        break;
                    case 2: // Right button clicked.
                        this.rightMouseDown = true;
                        e.preventDefault();
                        break;
                }
            }
        });
        canvas.addEventListener('mousemove', (e) => {
            if (this.leftMouseDown) {
                const clikedPoint = new Vector(e.offsetX, e.offsetY).add(this.camera.pos);
                this.movePlayerHandle(clikedPoint);
            }
            if (this.rightMouseDown) {
                const drag = new Vector(e.movementX, e.movementY);
                this.dragCameraHandle(drag);
            }
        });
        canvas.addEventListener('mouseup', (e) => {
            if (typeof e === 'object') {
                switch (e.button) {
                    case 0: // 'Left button clicked.
                        this.leftMouseDown = false;
                        e.preventDefault();
                        break;
                    case 1: // Middle button clicked.
                        break;
                    case 2: // Right button clicked.
                        this.rightMouseDown = false;
                        e.preventDefault();
                        break;
                }
            }
        });
    }
}
