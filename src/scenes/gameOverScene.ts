import { Scene } from '/core/scene';
import { Input, KEY } from '/core/input';
import { SnakeGame } from '/game/snakeGame';
import { GameOverLayer } from '/layers/gameOverLayer';
import { ObjectTypes } from '/game/interfaces';

export class GameOverScene extends Scene<ObjectTypes> {
  private input: Input;

  constructor(public game: SnakeGame) {
    super(game);
    this.input = new Input(document.body);
    this.addObjects();
    this.setupInput();
  }

  private addObjects() {
    this.addObject(new GameOverLayer(this.game, this));
  }

  private setupInput() {
    this.input.onkeydown(params => {
      if (params.key === KEY.SPACE) {
        this.game.restart()
      } else if (params.key === KEY.F) {
        this.game.toggleFullscreen();
      }
    });
  }
}