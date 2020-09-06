import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { ObjectTypes} from '/game/interfaces';
import { Label } from '/core/label';

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
    const point = { x: 0, y: 0 };
    const dim = { width: this.game.width, height: this.game.height };
    this.game.renderer.fillRect(this.backgroundColor, point, dim);
  }

  private fillText() {
    const text = 'PAUSE';
    const size = this.game.width / 10;
    const point =  { x: this.game.width / 2, y: this.game.height / 2 };
    const label = new Label(text, '#000', size, 'PixelBoy', 'normal', 'center', 'middle');
    this.game.renderer.drawLabel(label, point);
  }
}