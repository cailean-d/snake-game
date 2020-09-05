import { Scene } from '/core/scene';
import { Input } from '/core/input';
import { KEY } from '/core/input';
import { TileMap } from '/core/tileMap';
import { SnakeGame } from '/game/snakeGame';
import { Snake } from '/objects/snake';
import { ObjectTypes, SnakeDirection } from '/game/interfaces';
import { GameLayer } from '/layers/gameLayer';
import { BackgroundLayer } from '/layers/backgroundLayer';
import { InterfaceLayer } from '/layers/interfaceLayer';
import { PauseLayer } from '/layers/pauseLayer';

export class GameScene extends Scene<ObjectTypes> {
  public tileMap: TileMap<ObjectTypes>;
  private _input: Input;

  constructor(public game: SnakeGame) {
    super(game);
    this.tileMap = new TileMap(this.game, this.game.options.mapSize);
    this._input = new Input(document.body);
    this.addObjects();
    this.setInput();
  }

  private addObjects() {
    this.addObject(new BackgroundLayer(this.game, this));
    this.addObject(new GameLayer(this.game, this));
    this.addObject(new InterfaceLayer(this.game, this));
    this.addObject(new PauseLayer(this.game, this));
  }

  private setInput() {
    const snake = this.getObject(ObjectTypes.SNAKE) as Snake;
    this._input.onkeydown(params => {
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
        case KEY.SPACE:
          this.isPaused = !this.isPaused;
          break;
      }
    });
  }
}