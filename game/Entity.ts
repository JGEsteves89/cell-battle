import Vector from './Vector.js';

export default class Entity {
	public pos: Vector;
	public size: { width: number; height: number };
	constructor(x: number, y: number, width: number, height: number) {
		this.pos = new Vector(x, y);
		this.size = { width, height };
	}
}
