import Entity from './Entity.js';
import Vector from './Vector.js';
import World from './World.js';

export default class Camera extends Entity {
	private world: World;
	constructor(world: World, width: number, height: number) {
		super(0, 0, width, height);
		this.world = world;
	}
	drag(drag: Vector) {
		this.pos = this.pos.subtract(drag);
	}
	render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		const viewingGrids = this.world.getViewingGrids(this.pos, this.size);

		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.fillStyle = '#272727';
		ctx.strokeStyle = 'black';
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		ctx.strokeStyle = '#613F37';
		ctx.lineWidth = 1;
		for (const grid of viewingGrids) {
			ctx.rect(grid.x - this.pos.x, grid.y - this.pos.y, grid.size, grid.size);
		}
		ctx.stroke();

		for (const object of this.world.objects) {
			object.draw(ctx, this);
		}
	}
}
