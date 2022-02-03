export default class Camera {
    constructor(world, width, height) {
        this.world = world;
        this.size = { width, height };
        this.position = { x: 0, y: 0 };
    }
    render(canvas, ctx) {
        const viewingGrids = this.world.getViewingGrids(this.position, this.size);
        ctx.beginPath();
        ctx.fillStyle = '#272727';
        ctx.strokeStyle = 'black';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = '#613F37';
        for (const grid of viewingGrids) {
            ctx.rect(grid.x - this.position.x, grid.y - this.position.y, grid.size, grid.size);
        }
        ctx.stroke();
        for (const object of this.world.objects) {
            ctx.fillStyle = '#284634';
            ctx.fillRect(object.x - this.position.x, object.y - this.position.y, 20, 20);
        }
    }
}
