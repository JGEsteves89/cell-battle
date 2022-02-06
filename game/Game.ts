import World from './World.js';
import Camera from './Camera.js';
import Timer from './Timer.js';
import RigidBody from './RigidBody.js';
import Controller from './Controller.js';
export default class Game {
	public timer: Timer;
	public world: any;
	public camera: any;
	public player: any;
	public controller: any;
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.timer = new Timer();
		this.world = new World();
		this.camera = new Camera(this.world, width, height);
		this.controller = new Controller(canvas, this.camera);
		this.controller.setDragCameraHandle(this.camera.drag.bind(this.camera));
		this.controller.setMovePlayerHandle(this.player.pointTo.bind(this.player));

		this.player = new RigidBody(0, 0, 50, 50);
		this.world.addObject(this.player);
	}
	start() {
		this.timer.startTimer(this.renderFunction.bind(this));
	}
	renderFunction(deltaTime: number) {
		this.world.update(deltaTime);
		this.camera.render(this.canvas, this.ctx);
	}
}
