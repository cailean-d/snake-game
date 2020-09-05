import { Scene } from '/core/scene';
import { Input } from '/core/input';
import { SnakeGame } from '/game/snakeGame';
import { ObjectTypes } from '/game/interfaces';
import { GameMenuLayer } from '/layers/gameMenuLayer';

export class GameMenuScene extends Scene<ObjectTypes> {
  private input: Input;

  constructor(public game: SnakeGame) {
    super(game);
    this.input = new Input(document.body);
    this.addObjects();
    this.setInput();
  }

  private addObjects() {
    this.addObject(new GameMenuLayer(this.game, this));
  }

  private setInput() {
    this.input.onkeydown(_ => {
      this.game.setGameScene();
    });
  }
}