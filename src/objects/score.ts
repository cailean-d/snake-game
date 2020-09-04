import { GameObject, Point } from '/core/interfaces';
import { ObjectTypes } from '/game/interfaces';
import { GameSnake } from '/game/gameSnake';

export class Score implements GameObject<ObjectTypes> {
  public type: ObjectTypes;
  private _score: number;
  private _defaultScore: number;
  private position: Point;

  public get score() {
    return this._score;
  }

  public get defaultScore() {
    return this._defaultScore;
  }

  constructor(private gameSnake: GameSnake) {
    this.type = ObjectTypes.SCORE;
    this._score = 0;
    this._defaultScore = 5;
    this.updatePosition();
  }
  
  public render() {
    this.updatePosition();
    this.drawText();
  }

  public reset() {
    this._score = 0;
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.gameSnake.options.timeThreshold;
    this._score += Math.round(defaultThreshold * this._defaultScore / currentThreshold);
  }

  private drawText() {
    const g = this.gameSnake;
    g.ctx.fillStyle = '#000';
    g.ctx.fillText(`Score: ${this._score}`, this.position.x, this.position.y);
  }

  private updatePosition() {
    this.position = { x: 5, y: this.gameSnake.height - 5 };
  }
}