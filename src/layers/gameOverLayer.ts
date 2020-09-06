import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameOverScene } from '/scenes/gameOverScene';
import { ObjectTypes } from '/game/interfaces';
import { Label } from '/core/label';

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
    const point = { x: 0, y: 0 };
    const dim = { width: this.game.width, height: this.game.height };
    this.game.renderer.fillRect(this.wallColor, point, dim);
  }

  private fillGameOver() {
    const text = 'GAME OVER';
    const size = this.game.width / 15;
    const point =  { x: this.game.width / 2, y: this.game.height / 2.2 };
    const label = new Label(text, '#000', size, 'PixelBoy', 'normal', 'center', 'middle');
    this.game.renderer.drawLabel(label, point);
  }

  private fillScore() {
    const text = `YOUR SCORE: ${this.game.score}`;
    const size = this.game.width / 30;
    const point = { x: this.game.width / 2, y: this.game.height / 1.8 };
    const label = new Label(text, '#000', size, 'PixelBoy', 'normal', 'center', 'middle');
    this.game.renderer.drawLabel(label, point);
  }
  
  private fillText() {
    const text = `PRESS SPACE TO RESTART`;
    const size = this.game.width / 30;
    const point = { x: this.game.width / 2, y: this.game.height / 1.1 };
    const label = new Label(text, '#000', size, 'PixelBoy', 'normal', 'center', 'middle');
    this.game.renderer.drawLabel(label, point);
  }
}