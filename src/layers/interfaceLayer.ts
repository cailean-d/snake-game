import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/game/gameScene';
import { ObjectTypes} from '/game/interfaces';
import { Score } from '/objects/score';

export class InterfaceLayer extends Layer<ObjectTypes> {

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.addObject(new Score(game, scene));
  }
}