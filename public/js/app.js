import World from './game/World.js';
import Camera from './game/Camera.js';
import Timer from './game/Timer.js';
function setupCanvas() {
    const margin = 30;
    const width = window.innerWidth - margin;
    const height = window.innerHeight - margin;
    console.log(width, height);
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
world.addObject(0, 0);
timer.startTimer(renderFunction);
let mouseDown = false;
window.addEventListener('mousedown', (e) => {
    mouseDown = true;
});
window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        camera.position.x -= e.movementX;
        camera.position.y -= e.movementY;
    }
});
window.addEventListener('mouseup', (e) => {
    mouseDown = false;
});
function renderFunction() {
    camera.render(canvas, ctx);
}
