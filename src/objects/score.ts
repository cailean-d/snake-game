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
    this.drawText();
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.game.options.timeThreshold;
    this.game.score += Math.round(defaultThreshold * this.defaultScore / currentThreshold);
  }

  private drawText() {
    this.game.ctx.textAlign = 'left';
    this.game.ctx.textBaseline = 'bottom';
    this.game.ctx.font = `${this.game.width / 50}px PixelBoy, Courier, serif`;
    this.game.ctx.fillStyle = '#000';
    this.game.ctx.fillText(`SCORE: ${this.game.score}`, 5, this.game.height - 5);
  }

}