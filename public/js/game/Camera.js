import Entity from './Entity.js';
export default class Camera extends Entity {
    constructor(world, width, height) {
        super(0, 0, width, height);
        this.world = world;
    }
    render(canvas, ctx) {
        const viewingGrids = this.world.getViewingGrids(this.pos, this.size);
        ctx.beginPath();
        ctx.fillStyle = '#272727';
        ctx.strokeStyle = 'black';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = '#613F37';
        for (const grid of viewingGrids) {
            ctx.rect(grid.x - this.pos.x, grid.y - this.pos.y, grid.size, grid.size);
        }
        ctx.stroke();
        for (const object of this.world.objects) {
            ctx.fillStyle = '#284634';
            ctx.fillRect(object.pos.x - this.pos.x, object.pos.y - this.pos.y, 20, 20);
        }
    }
}
