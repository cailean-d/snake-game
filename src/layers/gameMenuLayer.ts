import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameMenuScene } from '/scenes/gameMenuScene';
import { ObjectTypes } from '/game/interfaces';
import { Label } from '/core/label';

export class GameMenuLayer extends Layer<ObjectTypes> {
  private wallColor: string;

  constructor(protected game: SnakeGame, protected scene: GameMenuScene) {
    super(game, scene);
    this.wallColor = '#0f4628';
  }

  public render() {
    this.fillCanvas();
    this.drawLogo();
    this.fillText();
  }

  private fillCanvas() {
    const point = { x: 0, y: 0 };
    const dim = { width: this.game.width, height: this.game.height };
    this.game.renderer.fillRect(this.wallColor, point, dim);
  }

  private fillText() {
    const text = 'PRESS ANY KEY TO START';
    const size = this.game.width / 30;
    const point =  { x: this.game.width / 2, y: this.game.height / 1.4 };
    const label = new Label(text, '#000', size, 'PixelBoy', 'normal', 'center', 'middle');
    this.game.renderer.drawLabel(label, point);
  }

  private drawLogo() {
    const logo = this.game.assets.logo;
    const ratio = logo.width / logo.height;
    const height = this.game.height / 3;
    const width = height * ratio;
    const offsetX = width / 2;
    const offsetY = height / 1.5;
    const x = this.game.width / 2 - offsetX;
    const y = this.game.height / 2 - offsetY;
    this.game.renderer.drawImage(logo, { x, y }, { width, height });
  }
}