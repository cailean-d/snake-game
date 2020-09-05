import { GameObject, Point } from '/core/interfaces';
import { ObjectTypes } from '/game/interfaces';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/game/gameScene';

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

  constructor(private game: SnakeGame, private scene: GameScene) {
    this.type = ObjectTypes.SCORE;
    this._score = 0;
    this._defaultScore = 5;
    this.updatePosition();
  }
  
  public render() {
    this.updatePosition();
    this.drawText();
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.game.options.timeThreshold;
    this._score += Math.round(defaultThreshold * this._defaultScore / currentThreshold);
  }

  private drawText() {
    const g = this.game;
    g.ctx.fillStyle = '#000';
    g.ctx.fillText(`Score: ${this._score}`, this.position.x, this.position.y);
  }

  private updatePosition() {
    this.position = { x: 5, y: this.game.height - 5 };
  }
}