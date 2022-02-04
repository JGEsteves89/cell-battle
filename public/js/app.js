import World from './game/World.js';
import Camera from './game/Camera.js';
import Timer from './game/Timer.js';
import RigidBody from './game/RigidBody.js';
import Controller from './game/Controller.js';
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
const controller = new Controller(canvas, camera);
controller.setDragCameraHandle(camera.drag.bind(camera));
controller.setMovePlayerHandle(player.pointTo.bind(player));
timer.startTimer(renderFunction);
function renderFunction() {
    player.update();
    camera.render(canvas, ctx);
}
