import { GameObject } from '/core/gameObject';
import { ObjectTypes } from '/game/interfaces';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';

export class Score extends GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public defaultScore: number;

  constructor(private game: SnakeGame, private scene: GameScene) {
    super();
    this.type = ObjectTypes.SCORE;
    this.defaultScore = 5;
  }
  
  public render() {
    const text = `SCORE: ${this.game.score}`;
    this.drawTextBackground(text);
    this.drawText(text);
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.game.options.timeThreshold;
    this.game.score += Math.round(defaultThreshold * this.defaultScore / currentThreshold);
  }
  
  private drawTextBackground(text: string) {
    this.game.ctx.font = `${this.game.width / 50}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    const textWidth = this.game.ctx.measureText(text).width;
    const textHeight = 3 / 4 * (this.game.width / 50);
    this.game.ctx.fillRect(5, 5, textWidth + 10, textHeight + 10);
  }

  private drawText(text: string) {
    this.game.ctx.textAlign = 'left';
    this.game.ctx.textBaseline = 'middle';
    this.game.ctx.font = `${this.game.width / 50}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = '#fff';
    this.game.ctx.fillText(text, 10, 10);
  }

}