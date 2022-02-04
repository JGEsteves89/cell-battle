import Entity from './Entity.js';
import Vector from './Vector.js';

export default class RigidBody extends Entity {
	public vel: Vector;
	public speed: number = 0.5;
	public speedLimit: number = 10;
	public speedDrag: number = 0.95;
	public target: Vector;
	constructor(x: number, y: number, width: number, height: number, vel: Vector = new Vector(0, 0)) {
		super(x, y, width, height);
		this.target = this.pos;
		this.vel = vel;
	}
	pointTo(target: Vector) {
		this.target = target;
	}
	update() {
		const dist = this.target.subtract(this.pos);
		if (dist.length() > this.speedLimit) {
			const speedDir = dist.normalize().multiply(this.speed);
			this.vel = this.vel.add(speedDir).limit(this.speedLimit);
		} else {
			this.vel = dist;
		}
		this.pos = this.pos.add(this.vel);
		this.vel = this.vel.multiply(this.speedDrag);
	}
}
