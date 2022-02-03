export default class Vector {
	public x: number;
	public y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	add(other: Vector) {
		return new Vector(this.x + other.x, this.y + other.y);
	}
	subtract(other: Vector) {
		return new Vector(this.x - other.x, this.y - other.y);
	}
	multiply(scalar: number) {
		return new Vector(this.x * scalar, this.y * scalar);
	}
	divide(scalar: number) {
		return new Vector(this.x / scalar, this.y / scalar);
	}
	dot(other: Vector) {
		return this.x * other.x + this.y * other.y;
	}
	cross(other: Vector) {
		return this.x * other.y - other.x * this.y;
	}
	hadamard(other: Vector) {
		return new Vector(this.x * other.x, this.y * other.y);
	}
	length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	normalize() {
		const length = this.length();
		return new Vector(this.x / length, this.y / length);
	}
	limit(limit: number) {
		const l = this.length();
		if (l < limit) {
			return new Vector(this.x, this.y);
		}
		return this.normalize().multiply(limit);
	}
	rotateByRadians(radians: number) {
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);
		return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}
	rotateByDegrees(degrees: number) {
		return this.rotateByRadians((degrees * Math.PI) / 180);
	}
}
