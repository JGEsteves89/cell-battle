import Entity from './Entity.js';
import Vector from './Vector.js';

export default class RigidBody extends Entity {
	public vel: Vector;
	constructor(x: number, y: number, width: number, height: number, vel: Vector = new Vector(0, 0)) {
		super(x, y, width, height);
		this.vel = vel;
	}
	pointTo(target: Vector, speed: number, speedLimit: number) {
		const dist = target.subtract(this.pos);
		if (dist.length() > speedLimit) {
			const speedDir = dist.normalize().multiply(speed);
			this.vel = this.vel.add(speedDir).limit(speedLimit);
		} else {
			this.vel = dist;
		}
	}
	update() {
		this.pos = this.pos.add(this.vel);
		this.vel = this.vel.multiply(0.95);
	}
}
