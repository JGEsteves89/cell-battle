import Vector from './Vector.js';
export default class Entity {
    constructor(x, y, width, height) {
        this.pos = new Vector(x, y);
        this.size = { width, height };
    }
    draw(ctx, camera) {
        throw new Error('Method not implemented.');
    }
    update(deltaTime) {
        throw new Error('Method not implemented.');
    }
}
