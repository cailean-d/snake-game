import { Game } from './core/game';
import { KEY } from './core/input';
import { SnakeDirection } from './interfaces';
import { Apple } from './objects/apple';
import { Snake } from './objects/snake';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;

const game = new Game(canvas);
const apple = new Apple();
const snake = new Snake();
game.addObject(apple);
game.addObject(snake);

game.input.onkeydown(params => {
  switch(params.key) {
    case KEY.ARROW_LEFT:
      snake.turn(SnakeDirection.LEFT);
      break;
    case KEY.ARROW_UP:
      snake.turn(SnakeDirection.UP);
      break;
    case KEY.ARROW_RIGHT:
      snake.turn(SnakeDirection.RIGHT);
      break;
    case KEY.ARROW_DOWN:
      snake.turn(SnakeDirection.DOWN);
      break;
  }
});

game.start();
