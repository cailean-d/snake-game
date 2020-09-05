import { GameObject, Point, Position } from '/core/interfaces';
import { ObjectTypes, SnakeDirection } from '/game/interfaces';
import { GameSnake } from '/game/gameSnake';
import { CollisionDetection } from '/game/collision';

export class Snake implements GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public snakeTail: Point[];
  private direction: SnakeDirection;
  private nextDirection: SnakeDirection;
  private timer: number;
  private timeThreshold: number;
  private minTimeThreshold: number;
  private collision: CollisionDetection;

  constructor(private gameSnake: GameSnake) {
    this.type = ObjectTypes.SNAKE;
    this.collision = new CollisionDetection(this.gameSnake);
    this.minTimeThreshold = 20;
    this.reset();
  }

  public render() {
    this.updateTimer();
    this.checkCollision();
    this.drawSnake();
  }

  public reset() {
    this.direction = SnakeDirection.RIGHT;
    this.nextDirection = SnakeDirection.RIGHT;
    this.snakeTail = this.generateSnake();
    this.timeThreshold = this.gameSnake.options.timeThreshold;
    this.timer = 0;
  }

  public turn(direction: SnakeDirection) {
    this.nextDirection = direction;
  }

  private tryTurn() {
    if (
      (this.nextDirection === SnakeDirection.LEFT && this.direction !== SnakeDirection.RIGHT) ||
      (this.nextDirection === SnakeDirection.UP && this.direction !== SnakeDirection.DOWN) ||
      (this.nextDirection === SnakeDirection.RIGHT && this.direction !== SnakeDirection.LEFT) ||
      (this.nextDirection === SnakeDirection.DOWN && this.direction !== SnakeDirection.UP)
    ) {
      this.direction = this.nextDirection;
    }
  }

  private generateSnake(): Point[] {
    const g = this.gameSnake;
    return Array.from(Array(g.options.snakeLength).keys()).map(i => ({ x: i, y: 0 }));
  }

  private checkCollision() {
    if (this.canMove()) {
      this.tryTurn();
      if (this.collision.withApple()) {
        this.move(true);
        this.generateNextApple();
        this.updateScore();
        this.updateSpeed();
        return;
      }
      this.move();
      if (this.collision.withWalls()) {
        this.gameSnake.restart();
      } else if (this.collision.withTail()) {
        this.gameSnake.restart();
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
    this.timer += this.gameSnake.frameDelta;
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
    const tail = snakeGrow ? Object.assign({}, head) : this.snakeTail.shift();
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
    this.gameSnake.apple.generatePosition();
  }

  private updateScore() {
    this.gameSnake.score.scoreUp(this.timeThreshold);
  }

  private updateSpeed() {
    const score = this.gameSnake.score;
    const defaultThreshold = this.gameSnake.options.timeThreshold;
    const percent = this.gameSnake.options.timeThreshold / 100;
    const scoreMidifier = score.defaultScore ? score.score / score.defaultScore : score.defaultScore;
    this.timeThreshold = Math.max(this.minTimeThreshold, defaultThreshold - percent * scoreMidifier);
  }

  private drawCeil(point: Point, color: string) {
    const g = this.gameSnake;
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

  private drawSnake() {
    this.snakeTail.forEach((curr, i) => {
      // const color = this.getColor(i);
      // this.drawCeil(curr, color);
      let tile: Position;

      if (i === 0) {
        tile = this.getTailTile(curr, i);
      } else if (i === this.snakeTail.length - 1) {
        tile = this.getHeadTile();
      } else {
        tile = this.getBodyTile(curr, i);
      }

      const cell = this.gameSnake.tileMap.getCell({ row: curr.y, column: curr.x });
      const sprite = this.gameSnake.snakeSpriteSheet.getSprite(tile);
      this.gameSnake.ctx.drawImage(sprite.buffer, cell.x, cell.y, cell.width, cell.height);
      // this.gameSnake.snakeSpriteSheet.draw(tile, cell);
    });
  }

  private getHeadTile(): Position {
    switch(this.direction) {
      case SnakeDirection.UP:
        return { row: 0, column: 3 };
      case SnakeDirection.RIGHT:
        return { row: 0, column: 4 };
      case SnakeDirection.DOWN:
        return { row: 1, column: 4 };
      case SnakeDirection.LEFT:
        return { row: 1, column: 3 };
    }
  }

  private getTailTile(curr: Point, i: number): Position {
    const next = this.snakeTail[i + 1];
    if (next.y < curr.y) {
      return { row: 2, column: 3 };
    } else if (next.x > curr.x) {
      return { row: 2, column: 4 };
    } else if (next.y > curr.y) {
      return { row: 3, column: 4 };
    } else if (next.x < curr.x) {
      return { row: 3, column: 3 };
    }
  }

  private getBodyTile(curr: Point, i: number): Position {
    const next = this.snakeTail[i + 1];
    const prev = this.snakeTail[i - 1];
    if (next.x < curr.x && prev.x > curr.x || prev.x < curr.x && next.x > curr.x) {
      return { row: 0, column: 1 };
    } else if (next.x < curr.x && prev.y > curr.y || prev.x < curr.x && next.y > curr.y) {
      return { row: 0, column: 2 };
    } else if (next.y < curr.y && prev.y > curr.y || prev.y < curr.y && next.y > curr.y) {
      return { row: 1, column: 2 };
    } else if (next.y < curr.y && prev.x < curr.x || prev.y < curr.y && next.x < curr.x) {
      return { row: 2, column: 2 };
    } else if (next.x > curr.x && prev.y < curr.y || prev.x > curr.x && next.y < curr.y) {
      return { row: 1, column: 0 };
    } else if (next.y > curr.y && prev.x > curr.x || prev.y > curr.y && next.x > curr.x) {
      return { row: 0, column: 0 };
    }
  }
}
