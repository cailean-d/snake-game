import { Game } from './core/game';
import { KEY } from './core/input';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;

const game = new Game(canvas);
game.start();
