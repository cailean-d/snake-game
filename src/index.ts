import { GameSnake } from './core/gameSnake';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;
const game = new GameSnake(canvas);
game.start();