import { Game } from './core/game';
import { KEY } from './core/input';
import { SnakeDirection, GameOptions } from './interfaces';
import { Apple } from './objects/apple';
import { Snake } from './objects/snake';

const canvas = document.querySelector('#stage') as HTMLCanvasElement;

const options: GameOptions = { size: 15, snakeLength: 5, timeThreshold: 200 };
const game = new Game<GameOptions>(canvas, options);
const apple = new Apple<GameOptions>(game);
const snake = new Snake<GameOptions>(game);
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
