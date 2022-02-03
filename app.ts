import World from './game/World.js';
import Camera from './game/Camera.js';
import Timer from './game/Timer.js';

function setupCanvas() {
	const margin = 30;
	const width = window.innerWidth - margin;
	const height = window.innerHeight - margin;
	console.log(width, height);

	const canvas = <HTMLCanvasElement>document.getElementById('screen')!;
	canvas.setAttribute('width', '' + width);
	canvas.setAttribute('height', '' + height);

	const ctx = canvas.getContext('2d')!;
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	return { canvas, ctx, width, height };
}

console.log('Starting...');

const { canvas, ctx, width, height } = setupCanvas();
const timer = new Timer();
const world = new World();
const camera = new Camera(world, width, height);
const player = { x: 0, y: 0, target: { x: 0, y: 0 } };
world.addObject(player);
let mouseDown = false;
let target: { x: number; y: number } = { x: 0, y: 0 };
canvas.addEventListener('mousedown', (e) => {
	target = { x: e.offsetX + camera.position.x, y: e.offsetY + camera.position.y };
	mouseDown = true;
});
canvas.addEventListener('mousemove', (e) => {
	if (mouseDown) {
		target = { x: e.offsetX + camera.position.x, y: e.offsetY + camera.position.y };
	}
});
canvas.addEventListener('mouseup', (e) => {
	mouseDown = false;
});
timer.startTimer(renderFunction);

function renderFunction() {
	player.target = target;
	let vx = player.target.x - player.x;
	let vy = player.target.y - player.y;
	const speed = 10;
	const s = Math.sqrt(vx * vx + vy * vy);
	if (s >= 10) {
		vx = (vx / s) * speed;
		vy = (vy / s) * speed;
		player.x += vx;
		player.y += vy;
	} else {
		player.x = target.x;
		player.y = target.y;
	}
	//console.log(target, vx, vy);

	camera.position.x = player.x - camera.size.width / 2;
	camera.position.y = player.y - camera.size.height / 2;
	camera.render(canvas, ctx);
}
