export default class Camera {
    constructor(world, width, height) {
        this.world = world;
        this.size = { width, height };
        this.position = { x: 0, y: 0 };
    }
    render(canvas, ctx) {
        const viewingGrids = this.world.getViewingGrids(this.position, this.size);
        ctx.beginPath();
        ctx.fillStyle = '#38785D';
        ctx.strokeStyle = 'black';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = '#BACCF5';
        for (const grid of viewingGrids) {
            ctx.rect(grid.x - this.position.x, grid.y - this.position.y, grid.size, grid.size);
            for (const object of grid.objects) {
                ctx.fillStyle = '#FF9D00';
                ctx.fillRect(object.x - this.position.x, object.y - this.position.y, 20, 20);
            }
        }
        ctx.stroke();
    }
}
