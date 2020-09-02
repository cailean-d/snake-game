import { Object, ObjectTypes, SnakeDirection, Point } from './../interfaces';
import { Game } from './../core/game';

export class Snake implements Object {
  public type: ObjectTypes;
  private direction: SnakeDirection;
  private size = 15;
  private length = 5;
  private snakeTail: Point[];
  private timer: number;
  private timeThreshold: number;

  constructor() {
    this.type = ObjectTypes.SNAKE;
    this.direction = SnakeDirection.RIGHT;
    this.snakeTail = this.generateSnake();
    this.timer = 0;
    this.timeThreshold = 200;
  }

  public render(game: Game) {
    this.snakeTail.forEach((point, i) => {
      const color = this.getColor(i);
      this.drawCeil(game.ctx, point, color);
    });
    this.updateTimer(game.frameDelta);
    this.move();
  }

  public turn(direction: SnakeDirection) {
    if (
      (direction === SnakeDirection.LEFT && this.direction !== SnakeDirection.RIGHT) ||
      (direction === SnakeDirection.UP && this.direction !== SnakeDirection.DOWN) ||
      (direction === SnakeDirection.RIGHT && this.direction !== SnakeDirection.LEFT) ||
      (direction === SnakeDirection.DOWN && this.direction !== SnakeDirection.UP)
    ) {
      this.direction = direction;
    }
  }

  private generateSnake(): Point[] {
    return Array.from(Array(this.length).keys()).map(i => ({ x: i, y: 0 }));
  }

  private getColor(i: number) {
    const last = this.snakeTail.length - 1;
    if (i === last) {
      return '#00ff00';
    } else {
      return '#aaaaaa';
    }
  }

  private updateTimer(frameDelta: number) {
    this.timer += frameDelta;
  }

  private canMove(): boolean {
    if (this.timer > this.timeThreshold) {
      this.timer = 0;
      return true;
    } else {
      return false;
    }
  }

  private move() {
    if (this.canMove()) {
      const head = this.snakeTail[this.snakeTail.length - 1];
      const tail = this.snakeTail.shift();
      switch (this.direction) {
        case SnakeDirection.LEFT:
          tail.x = head.x - 1;
          tail.y = head.y;
          break;
        case SnakeDirection.UP:
          tail.x = head.x;
          tail.y = head.y - 1;
          break;
        case SnakeDirection.RIGHT:
          tail.x = head.x + 1;
          tail.y = head.y;
          break;
        case SnakeDirection.DOWN:
          tail.x = head.x;
          tail.y = head.y + 1;
          break;
      }
      this.snakeTail.push(tail);
      this.timer = 0;
    }
  }

  private drawCeil(ctx: CanvasRenderingContext2D, point: Point, color: string) {
    const x = point.x * this.size + this.size / 2;
    const y = point.y * this.size + this.size / 2;
    const radius = this.size / 2;
    const start = 0;
    const end = 2 * Math.PI;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end);
    ctx.fill();
  }
}
