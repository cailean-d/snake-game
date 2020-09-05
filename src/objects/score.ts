import { GameObject } from '/core/gameObject';
import { ObjectTypes } from '/game/interfaces';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/game/gameScene';

export class Score extends GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public score: number;
  public defaultScore: number;

  constructor(private game: SnakeGame, private scene: GameScene) {
    super();
    this.type = ObjectTypes.SCORE;
    this.score = 0;
    this.defaultScore = 5;
  }
  
  public render() {
    this.drawText();
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.game.options.timeThreshold;
    this.score += Math.round(defaultThreshold * this.defaultScore / currentThreshold);
  }

  private drawText() {
    this.game.ctx.textAlign = 'left';
    this.game.ctx.textBaseline = 'bottom';
    this.game.ctx.font = `bold ${this.game.width / 50}px Courier`;
    this.game.ctx.fillStyle = '#000';
    this.game.ctx.fillText(`Score: ${this.score}`, 5, this.game.height - 5);
  }

}