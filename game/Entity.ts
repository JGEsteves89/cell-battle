import Camera from './Camera.js';
import Vector from './Vector.js';

export default class Entity {
	public pos: Vector;
	public size: { width: number; height: number };
	constructor(x: number, y: number, width: number, height: number) {
		this.pos = new Vector(x, y);
		this.size = { width, height };
	}
	draw(ctx: CanvasRenderingContext2D, camera: Camera) {
		throw new Error('Method not implemented.');
	}
	update(deltaTime: number) {
		throw new Error('Method not implemented.');
	}
}
