import { SnakeGame } from './game/snakeGame';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;
const game = new SnakeGame(canvas);
game.start();