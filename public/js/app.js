import World from './game/World.js';
import Camera from './game/Camera.js';
import Timer from './game/Timer.js';
import Vector from './game/Vector.js';
import RigidBody from './game/RigidBody.js';
function setupCanvas() {
    const margin = 30;
    const width = window.innerWidth - margin;
    const height = window.innerHeight - margin;
    const canvas = document.getElementById('screen');
    canvas.setAttribute('width', '' + width);
    canvas.setAttribute('height', '' + height);
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    return { canvas, ctx, width, height };
}
console.log('Starting...');
const { canvas, ctx, width, height } = setupCanvas();
const timer = new Timer();
const world = new World();
const camera = new Camera(world, width, height);
const player = new RigidBody(0, 0, 20, 20);
world.addObject(player);
let mouseDown = false;
let target = new Vector(0, 0);
canvas.addEventListener('mousedown', (e) => {
    target = new Vector(e.offsetX + camera.pos.x, e.offsetY + camera.pos.y);
    mouseDown = true;
});
canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        target = new Vector(e.offsetX + camera.pos.x, e.offsetY + camera.pos.y);
    }
});
canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
});
timer.startTimer(renderFunction);
function renderFunction() {
    player.pointTo(target, 0.5, 20);
    player.update();
    camera.pos.x = player.pos.x - camera.size.width / 2;
    camera.pos.y = player.pos.y - camera.size.height / 2;
    camera.render(canvas, ctx);
}
