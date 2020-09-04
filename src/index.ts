import { GameSnake } from './game/gameSnake';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;
const game = new GameSnake(canvas);
game.start();