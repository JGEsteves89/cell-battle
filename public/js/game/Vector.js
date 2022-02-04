export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    cross(other) {
        return this.x * other.y - other.x * this.y;
    }
    hadamard(other) {
        return new Vector(this.x * other.x, this.y * other.y);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    normalize() {
        const length = this.length();
        return new Vector(this.x / length, this.y / length);
    }
    limit(limit) {
        const l = this.length();
        if (l < limit) {
            return new Vector(this.x, this.y);
        }
        return this.normalize().multiply(limit);
    }
    rotateByRadians(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }
    rotateByDegrees(degrees) {
        return this.rotateByRadians((degrees * Math.PI) / 180);
    }
    static get zero() {
        return new Vector(0, 0);
    }
}
