import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameOverScene } from '/scenes/gameOverScene';
import { ObjectTypes } from '/game/interfaces';

export class GameOverLayer extends Layer<ObjectTypes> {
  private wallColor: string;

  constructor(protected game: SnakeGame, protected scene: GameOverScene) {
    super(game, scene);
    this.wallColor = '#0f4628';
  }

  public render() {
    this.fillCanvas();
    this.fillGameOver();
    this.fillScore();
    this.fillText();
  }

  private fillCanvas() {
    this.game.ctx.fillStyle = this.wallColor;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }

  private fillGameOver() {
    this.game.ctx.textAlign = 'center';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `bold ${this.game.width / 15}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = '#000';
    const x = this.game.width / 2;
    const y = this.game.height / 2.2;
    this.game.ctx.fillText('GAME OVER', x, y);
  }

  private fillScore() {
    this.game.ctx.textAlign = 'center';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `bold ${this.game.width / 30}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = '#000';
    const x = this.game.width / 2;
    const y = this.game.height / 1.8;
    this.game.ctx.fillText(`YOUR SCORE: ${this.game.score}`, x, y);
  }
  
  private fillText() {
    this.game.ctx.textAlign = 'center';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `bold ${this.game.width / 40}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = '#000';
    const x = this.game.width / 2;
    const y = this.game.height / 1.1;
    this.game.ctx.fillText('PRESS SPACE TO RESTART ', x, y);
  }
}