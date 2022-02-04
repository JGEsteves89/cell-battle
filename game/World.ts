import Entity from './Entity.js';
import Vector from './Vector.js';

export default class World {
	public grid: Array<any>;
	public objects: Array<Entity>;
	public size = 5000;
	public gridSize = 100;
	public rows = this.size / this.gridSize;
	public cols = this.size / this.gridSize;

	constructor() {
		this.objects = [];
		this.grid = [];
		for (let y = 0; y < this.size; y += this.gridSize) {
			for (let x = 0; x < this.size; x += this.gridSize) {
				this.grid.push({ x, y, size: this.gridSize });
			}
		}
	}
	addObject(obj: Entity) {
		this.objects.push(obj);
	}

	coordinatesToGrid(coord: Vector) {
		const xComp = (coord.x / this.gridSize) | 0;
		const yComp = ((coord.y / this.gridSize) | 0) * this.rows;
		return xComp + yComp;
	}
	gridToCoordinates(i: number) {
		const ix = i % this.rows | 0;
		const x = ix * this.gridSize;
		const y = ((i - ix) / this.cols) * this.gridSize;
		return { x, y };
	}
	getViewingGrids(pos: Vector, size: { width: number; height: number }) {
		const viewingGrids = [];
		const sx = Math.max(pos.x, 0);
		const sy = Math.max(pos.y, 0);
		const ex = Math.min(pos.x + size.width, this.size);
		const ey = Math.min(pos.y + size.height, this.size);
		for (let y = sy; y < ey; y += this.gridSize) {
			for (let x = sx; x < ex; x += this.gridSize) {
				const index = this.coordinatesToGrid(new Vector(x, y));
				viewingGrids.push(this.grid[index]);
			}
		}
		return viewingGrids;
	}
}
