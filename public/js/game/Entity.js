import Vector from './Vector.js';
export default class Entity {
    constructor(x, y, width, height) {
        this.pos = new Vector(x, y);
        this.size = { width, height };
    }
}
