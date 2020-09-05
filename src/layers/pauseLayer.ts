import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/game/gameScene';
import { ObjectTypes} from '/game/interfaces';

export class PauseLayer extends Layer<ObjectTypes> {
  private backgroundColor: string;

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }

  public render() {
    if (!this.scene.isPaused) return;
    this.fillCanvas();
    this.fillText();
  }

  private fillCanvas() {
    this.game.ctx.fillStyle = this.backgroundColor;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }

  private fillText() {
    this.game.ctx.textAlign = 'center';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `bold ${this.game.width / 10}px Courier`;
    this.game.ctx.fillStyle = '#000';
    this.game.ctx.fillText('PAUSE', this.game.width / 2, this.game.height / 2);
  }
}