import { Game } from './game';
import { AssetLoader } from './assetLoader';
import { KEY } from './input';
import { Apple } from './../objects/apple';
import { Snake } from './../objects/snake';
import { Score } from './../objects/score';
import snakeTile from './../assets/snake-tiles.png';
import { SnakeDirection, GameOptions, ObjectTypes } from './../interfaces';
import { SnakeGameAssets, AssetLoaderItemsMap } from './../interfaces';

export class GameSnake {
  public game: Game<GameOptions>;
  public assetLoader: AssetLoader<SnakeGameAssets>;
  public assets: AssetLoaderItemsMap<SnakeGameAssets>;

  constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
    const opts = Object.assign({}, this.defaultOptions, options || {});
    this.game = new Game<GameOptions>(canvas, opts);
    this.assetLoader = new AssetLoader();
    this.assetLoader.add('snakeTile', snakeTile);
    this.addObjects();
    this.setInput();
  }

  public async start() {
    this.assets = await this.assetLoader.load();
    console.log(this.assets)
    this.game.start();
  }

  public restart() {
    for (const object of this.game.objects) {
      object.reset();
    }
  }

  private get defaultOptions() {
    const options: GameOptions = { size: 15, snakeLength: 5, timeThreshold: 100 };
    return options;
  }

  private addObjects() {
    const apple = new Apple<GameOptions>(this);
    const snake = new Snake<GameOptions>(this);
    const score = new Score<GameOptions>(this);
    this.game.addObject(apple);
    this.game.addObject(snake);
    this.game.addObject(score);
  }

  private setInput() {
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<GameOptions>;
    this.game.input.onkeydown(params => {
      switch(params.key) {
        case KEY.ARROW_LEFT:
        case KEY.A:
          snake.turn(SnakeDirection.LEFT);
          break;
        case KEY.ARROW_UP:
        case KEY.W:
          snake.turn(SnakeDirection.UP);
          break;
        case KEY.ARROW_RIGHT:
        case KEY.D:
          snake.turn(SnakeDirection.RIGHT);
          break;
        case KEY.ARROW_DOWN:
        case KEY.S:
          snake.turn(SnakeDirection.DOWN);
          break;
      }
    });
  }
}