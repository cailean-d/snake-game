import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { Apple } from '/objects/apple';
import { Snake } from '/objects/snake';
import { ObjectTypes } from '/game/interfaces';

export class GameLayer extends Layer<ObjectTypes> {

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.addObject(new Apple(game, scene));
    this.addObject(new Snake(game, scene));
  }
}