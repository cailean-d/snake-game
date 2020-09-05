import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameMenuScene } from '/scenes/gameMenuScene';
import { ObjectTypes } from '/game/interfaces';

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
    this.game.ctx.fillStyle = this.wallColor;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }

  private fillText() {
    this.game.ctx.textAlign = 'center';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `bold ${this.game.width / 30}px Courier`;
    this.game.ctx.fillStyle = '#000';
    const x = this.game.width / 2;
    const y = this.game.height / 1.4;
    this.game.ctx.fillText('PRESS ANY KEY TO START ', x, y);
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
    this.game.ctx.drawImage(logo, x, y, width, height);
  }
}