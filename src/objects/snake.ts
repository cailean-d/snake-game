import { Object, ObjectTypes, SnakeDirection, Point, GameOptions } from './../interfaces';
import { GameSnake } from './../core/gameSnake';
import { Apple } from './../objects/apple';
import { Score } from './../objects/score';
import { CollisionDelection } from './../core/collision';

export class Snake<T extends GameOptions> implements Object<T> {
  public type: ObjectTypes;
  public snakeTail: Point[];
  private direction: SnakeDirection;
  private timer: number;
  private timeThreshold: number;
  private minTimeThreshold: number;
  private collision: CollisionDelection<GameOptions>;

  constructor(private gameSnake: GameSnake) {
    this.type = ObjectTypes.SNAKE;
    this.collision = new CollisionDelection(this.gameSnake.game);
    this.minTimeThreshold = 20;
    this.reset();
  }

  public render() {
    this.updateTimer();
    this.checkCollision();
    this.snakeTail.forEach((point, i) => {
      const color = this.getColor(i);
      this.drawCeil(point, color);
    });
  }

  public reset() {
    this.direction = SnakeDirection.RIGHT;
    this.snakeTail = this.generateSnake();
    this.timeThreshold = this.gameSnake.game.options.timeThreshold;
    this.timer = 0;
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
    const g = this.gameSnake.game;
    return Array.from(Array(g.options.snakeLength).keys()).map(i => ({ x: i, y: 0 }));
  }

  private checkCollision() {
    if (this.canMove()) {
      if (this.collision.withWalls()) {
        this.gameSnake.restart();
      } else if (this.collision.withTail()) {
        this.gameSnake.restart();
      } else if (this.collision.withApple()) {
        this.move(true);
        this.generateNextApple();
        this.updateScore();
        this.updateSpeed();
      } else {
        this.move();
      }
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
    this.timer += this.gameSnake.game.frameDelta;
  }

  private canMove(): boolean {
    if (this.timer > this.timeThreshold) {
      this.timer = 0;
      return true;
    } else {
      return false;
    }
  }

  private move(snakeGrow = false) {
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

  private generateNextApple() {
    const apple = this.gameSnake.game.objects.find(obj => obj.type === ObjectTypes.APPLE) as Apple<T>;
    apple.generatePosition();
  }

  private updateScore() {
    const score = this.gameSnake.game.objects.find(obj => obj.type === ObjectTypes.SCORE) as Score<T>;
    score.scoreUp(this.timeThreshold);
  }

  private updateSpeed() {
    const score = this.gameSnake.game.objects.find(obj => obj.type === ObjectTypes.SCORE) as Score<T>;
    const defaultThreshold = this.gameSnake.game.options.timeThreshold;
    const percent = this.gameSnake.game.options.timeThreshold / 100;
    const scoreMidifier = score.defaultScore ? score.score / score.defaultScore : score.defaultScore;
    this.timeThreshold = Math.max(this.minTimeThreshold, defaultThreshold - percent * scoreMidifier);
  }

  private drawCeil(point: Point, color: string) {
    const g = this.gameSnake.game;
    const x = point.x * g.options.size + g.options.size / 2;
    const y = point.y * g.options.size + g.options.size / 2;
    const radius = g.options.size / 2;
    const start = 0;
    const end = 2 * Math.PI;
    g.ctx.fillStyle = color;
    g.ctx.beginPath();
    g.ctx.arc(x, y, radius, start, end);
    g.ctx.fill();
  }
}
