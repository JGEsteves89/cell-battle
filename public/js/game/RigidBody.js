import Entity from './Entity.js';
import Vector from './Vector.js';
export default class RigidBody extends Entity {
    constructor(x, y, width, height, vel = new Vector(0, 0)) {
        super(x, y, width, height);
        this.speed = 0.5;
        this.speedLimit = 10;
        this.speedDrag = 0.95;
        this.target = this.pos;
        this.vel = vel;
    }
    pointTo(target) {
        this.target = target;
    }
    update() {
        const dist = this.target.subtract(this.pos);
        if (dist.length() > this.speedLimit) {
            const speedDir = dist.normalize().multiply(this.speed);
            this.vel = this.vel.add(speedDir).limit(this.speedLimit);
        }
        else {
            this.vel = dist;
        }
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.multiply(this.speedDrag);
    }
}
