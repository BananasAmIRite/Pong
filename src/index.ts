import PongGame from './PongGame';

const elem = document.getElementById('game');

if (!(elem instanceof HTMLCanvasElement)) throw new Error('Element not of type `<canvas>`. ');

const g = new PongGame(elem);
g.start();
