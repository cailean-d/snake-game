import { Scene } from '/core/scene';
import { Input, KEY } from '/core/input';
import { SnakeGame } from '/game/snakeGame';
import { ObjectTypes } from '/game/interfaces';
import { GameOverLayer } from '/layers/gameOverLayer';

export class GameOverScene extends Scene<ObjectTypes> {
  private input: Input;

  constructor(public game: SnakeGame) {
    super(game);
    this.input = new Input(document.body);
    this.addObjects();
    this.setInput();
  }

  private addObjects() {
    this.addObject(new GameOverLayer(this.game, this));
  }

  private setInput() {
    this.input.onkeydown(params => {
      if (params.key === KEY.SPACE) {
        this.game.restart()
      }
    });
  }
}