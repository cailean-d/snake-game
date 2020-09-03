import { Object, ObjectTypes, SnakeDirection, Point, GameOptions } from './../interfaces';
import { Game } from './../core/game';
import { Apple } from './../objects/apple';
import { CollisionDelection } from './../core/collision';

export class Snake<T extends GameOptions> implements Object<T> {
  public type: ObjectTypes;
  public snakeTail: Point[];
  private direction: SnakeDirection;
  private timer: number;
  private collision: CollisionDelection<T>;

  constructor(private game: Game<T>) {
    this.type = ObjectTypes.SNAKE;
    this.direction = SnakeDirection.RIGHT;
    this.collision = new CollisionDelection(this.game);
    this.snakeTail = this.generateSnake();
    this.timer = 0;
  }

  public render() {
    this.updateTimer();
    this.checkCollision();
    this.snakeTail.forEach((point, i) => {
      const color = this.getColor(i);
      this.drawCeil(point, color);
    });
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
    return Array.from(Array(this.game.options.snakeLength).keys()).map(i => ({ x: i, y: 0 }));
  }

  private checkCollision() {
    if (this.collision.withWalls()) {
      console.log('game over: walls');
    } else if (this.collision.withTail()) {
      console.log('game over: tail');
    } else if (this.collision.withApple()) {
      this.move(true);
      this.generateNextApple();
    } else {
      this.move();
    }
  }

  private getColor(i: number) {
    const last = this.snakeTail.length - 1;
    if (i === last) {
      return '#00ff00';
    } else {
      return '#aaaaaa';
    }
  }

  private updateTimer() {
    this.timer += this.game.frameDelta;
  }

  private canMove(): boolean {
    if (this.timer > this.game.options.timeThreshold) {
      this.timer = 0;
      return true;
    } else {
      return false;
    }
  }

  private move(snakeGrow = false) {
    if (this.canMove()) {
      const head = this.snakeTail[this.snakeTail.length - 1];
      const tail = snakeGrow ? window.Object.assign({}, head) : this.snakeTail.shift();
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

  private generateNextApple() {
    const apple = this.game.objects.find(obj => obj.type === ObjectTypes.APPLE) as Apple<T>;
    apple.generatePosition();
  }

  private drawCeil(point: Point, color: string) {
    const x = point.x * this.game.options.size + this.game.options.size / 2;
    const y = point.y * this.game.options.size + this.game.options.size / 2;
    const radius = this.game.options.size / 2;
    const start = 0;
    const end = 2 * Math.PI;
    this.game.ctx.fillStyle = color;
    this.game.ctx.beginPath();
    this.game.ctx.arc(x, y, radius, start, end);
    this.game.ctx.fill();
  }
}
