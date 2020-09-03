import { Game } from './game';
import { KEY } from './input';
import { SnakeDirection, GameOptions, ObjectTypes } from './../interfaces';
import { Apple } from './../objects/apple';
import { Snake } from './../objects/snake';

export class GameSnake {
  public game: Game<GameOptions>;

  constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
    const opts = Object.assign({}, this.defaultOptions, options || {});
    this.game = new Game<GameOptions>(canvas, opts);
    this.addObjects();
    this.setInput();
  }

  public start() {
    this.game.start();
  }

  public restart() {
    for (const object of this.game.objects) {
      object.reset();
    }
  }

  private get defaultOptions() {
    const options: GameOptions = { size: 15, snakeLength: 5, timeThreshold: 50 };
    return options;
  }

  private addObjects() {
    const apple = new Apple<GameOptions>(this);
    const snake = new Snake<GameOptions>(this);
    this.game.addObject(apple);
    this.game.addObject(snake);
  }

  private setInput() {
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<GameOptions>;
    this.game.input.onkeydown(params => {
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
  }
}