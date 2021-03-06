import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { Score } from '/objects/score';
import { ObjectTypes } from '/game/interfaces';

export class InterfaceLayer extends Layer<ObjectTypes> {

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.addObject(new Score(game, scene));
  }
}