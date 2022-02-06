import Game from './game/Game.js';
import { setupCanvas } from './game/loaders.js';

console.log('Starting...');

const { canvas, ctx, width, height } = setupCanvas();
const game = new Game(canvas, ctx, width, height);
game.start();
