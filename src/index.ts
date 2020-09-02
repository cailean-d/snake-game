import { Game } from './game';
import { KEY } from './input';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;

const game = new Game(canvas);
