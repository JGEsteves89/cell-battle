import Camera from './Camera.js';
import Entity from './Entity.js';
import Vector from './Vector.js';

export default class RigidBody extends Entity {
	public vel: Vector;
	public dir: Vector = Vector.zero;
	public mass: number = 1;
	public maxSpeed: number = 4;
	public maxForce: number = 0.1;
	public speedDrag: number = 1;
	public target: Vector = Vector.zero;
	public gizmos = true;
	constructor(x: number, y: number, width: number, height: number, vel: Vector = Vector.zero) {
		super(x, y, width, height);
		this.target = this.pos;
		this.vel = vel;
	}
	pointTo(target: Vector) {
		this.target = target;
	}
	update(deltaTime: number) {
		this.dir = this.target.subtract(this.pos);
		const steeringForce = this.dir.limit(this.maxForce);
		const acc = steeringForce.divide(this.mass).multiply(deltaTime);

		this.vel = this.vel.add(acc).limit(this.maxSpeed);
		if (this.dir.length() < this.vel.length()) {
			this.pos = this.target;
			this.vel = Vector.zero;
		} else {
			this.pos = this.pos.add(this.vel);
		}
		this.vel = this.vel.multiply(this.speedDrag);
	}
	draw(ctx: CanvasRenderingContext2D, camera: Camera) {
		ctx.fillStyle = '#284634';
		const thisPos = new Vector(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
		ctx.beginPath();
		ctx.arc(thisPos.x, thisPos.y, this.size.width / 2, 0, 2 * Math.PI);
		ctx.fill();

		if (this.gizmos) {
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(this.target.x - camera.pos.x, this.target.y - camera.pos.y, 5, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.globalAlpha = 0.5;
			ctx.beginPath();
			ctx.moveTo(thisPos.x, thisPos.y);
			ctx.lineTo(this.target.x - camera.pos.x, this.target.y - camera.pos.y);
			ctx.stroke();
			ctx.globalAlpha = 1;

			ctx.strokeStyle = 'green';
			ctx.beginPath();
			const velDir = thisPos.add(this.vel.multiply(10));
			ctx.moveTo(thisPos.x, thisPos.y);
			ctx.lineTo(velDir.x, velDir.y);
			ctx.stroke();

			ctx.font = '14px serif';
			ctx.fillStyle = 'white';
			ctx.fillText('{' + this.pos.x.toFixed(0) + ' : ' + this.pos.y.toFixed(0) + '}', thisPos.x, thisPos.y);
			ctx.fillText(
				'{' + this.target.x.toFixed(0) + ' : ' + this.target.y.toFixed(0) + '}',
				this.target.x - camera.pos.x,
				this.target.y - camera.pos.y
			);
		}
	}
}
