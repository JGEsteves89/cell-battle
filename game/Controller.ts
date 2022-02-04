import Camera from './Camera.js';
import Vector from './Vector.js';

export default class Controller {
	private leftMouseDown: boolean = false;
	private rightMouseDown: boolean = false;
	private movePlayerHandle = (clikedPoint: Vector) => {};
	private dragCameraHandle = (drag: Vector) => {};
	private camera: Camera;

	constructor(canvas: HTMLCanvasElement, camera: Camera) {
		this.camera = camera;
		this.setupListeners(canvas);
	}
	public setMovePlayerHandle(handle: (clikedPoint: Vector) => void) {
		this.movePlayerHandle = handle;
	}
	public setDragCameraHandle(handle: (drag: Vector) => void) {
		this.dragCameraHandle = handle;
	}
	private setupListeners(canvas: HTMLCanvasElement): void {
		canvas.addEventListener('mousedown', (e) => {
			if (typeof e === 'object') {
				switch (e.button) {
					case 0: // 'Left button clicked.
						this.leftMouseDown = true;
						const clikedPoint: Vector = new Vector(e.offsetX, e.offsetY).add(this.camera.pos);
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
				const clikedPoint: Vector = new Vector(e.offsetX, e.offsetY).add(this.camera.pos);
				this.movePlayerHandle(clikedPoint);
			}
			if (this.rightMouseDown) {
				const drag: Vector = new Vector(e.movementX, e.movementY);
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
