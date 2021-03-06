import { Sprite } from '/core/sprite';
import { GameObject } from '/core/gameObject';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { Apple } from '/objects/apple';
import { Point } from '/core/interfaces';
import { ObjectTypes, SnakeDirection, SnakeSprites } from '/game/interfaces';
import { range } from '/game/utils';

export class Snake extends GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public snakeBody: Point[];
  private direction: SnakeDirection;
  private nextDirectionQueue: SnakeDirection[];
  private timer: number;
  private timeThreshold: number;
  private minTimeThreshold: number;
  private sprites: SnakeSprites;
  private isDead: boolean;

  constructor(private game: SnakeGame, private scene: GameScene) {
    super();
    this.type = ObjectTypes.SNAKE;
    this.minTimeThreshold = 20;
    this.direction = SnakeDirection.RIGHT;
    this.nextDirectionQueue = [];
    this.snakeBody = this.generateSnake();
    this.timeThreshold = this.game.options.timeThreshold;
    this.timer = 0;
    this.loadSprites();
  }

  public calculate() {
    this.updateTimer();
    this.checkCollision();
  }

  public render() {
    if (!this.isDead) {
      this.drawSnake();
    }
  }

  public turn(direction: SnakeDirection) {
    const que = this.nextDirectionQueue;
    if (!this.scene.isPaused && (!que.length || que[que.length - 1] !== direction)) {
      this.nextDirectionQueue.push(direction);
    }
  }

  private tryTurn() {
    if (!this.nextDirectionQueue.length) return;
    const nextDirection = this.nextDirectionQueue.shift();
    if (
      (nextDirection === SnakeDirection.LEFT && this.direction !== SnakeDirection.RIGHT) ||
      (nextDirection === SnakeDirection.UP && this.direction !== SnakeDirection.DOWN) ||
      (nextDirection === SnakeDirection.RIGHT && this.direction !== SnakeDirection.LEFT) ||
      (nextDirection === SnakeDirection.DOWN && this.direction !== SnakeDirection.UP)
    ) {
      this.direction = nextDirection;
    }
  }

  private generateSnake(): Point[] {
    return range(1, this.game.options.snakeLength).map(i => ({ x: i, y: 1 }));
  }

  private checkCollision() {
    if (this.canMove()) {
      this.tryTurn();
      if (this.game.collision.withApple(this.scene)) {
        this.move(true);
        this.generateNextApple();
        this.updateScore();
        this.updateSpeed();
        return;
      }
      this.move();
      if (this.game.collision.withWalls(this.scene)) {
        this.isDead = true;
        this.game.setGameOverScene();
      } else if (this.game.collision.withTail(this.scene)) {
        this.isDead = true;
        this.game.setGameOverScene();
      } 
    }
  }

  private updateTimer() {
    this.timer += this.game.frameDelta;
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
    const head = this.snakeBody[this.snakeBody.length - 1];
    const tail = snakeGrow ? Object.assign({}, head) : this.snakeBody.shift();
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
    this.snakeBody.push(tail);
    this.timer = 0;
  }

  private generateNextApple() {
    const apple = this.scene.getObject(ObjectTypes.APPLE) as Apple;
    apple.generatePosition();
  }

  private updateScore() {
    this.game.scoreUp(this.timeThreshold);
  }

  private updateSpeed() {
    const defaultThreshold = this.game.options.timeThreshold;
    const percent = this.game.options.timeThreshold / 100;
    const scoreMidifier = this.game.score / this.game.defaultScore;
    this.timeThreshold = Math.max(this.minTimeThreshold, defaultThreshold - percent * scoreMidifier);
  }

  private drawSnake() {
    this.snakeBody.forEach((curr, i) => {
      let tile: Sprite;
      if (i === 0) {
        tile = this.getTailTile(curr, i);
      } else if (i === this.snakeBody.length - 1) {
        tile = this.getHeadTile();
      } else {
        tile = this.getBodyTile(curr, i);
      }
      const cell = this.scene.tileMap.getCell(curr);
      this.game.renderer.drawTileSprite(tile, cell);
    });
  }

  private getHeadTile(): Sprite {
    switch(this.direction) {
      case SnakeDirection.UP:
        return this.sprites.headUp;
      case SnakeDirection.RIGHT:
        return this.sprites.headRight;
      case SnakeDirection.DOWN:
        return this.sprites.headDown;
      case SnakeDirection.LEFT:
        return this.sprites.headLeft;
    }
  }

  private getTailTile(curr: Point, i: number): Sprite {
    const next = this.snakeBody[i + 1];
    if (next.y < curr.y) {
      return this.sprites.tailUp;
    } else if (next.x > curr.x) {
      return this.sprites.tailRight;
    } else if (next.y > curr.y) {
      return this.sprites.tailDown;
    } else if (next.x < curr.x) {
      return this.sprites.tailLeft;
    }
  }

  private getBodyTile(curr: Point, i: number): Sprite {
    const next = this.snakeBody[i + 1];
    const prev = this.snakeBody[i - 1];
    if (next.x < curr.x && prev.x > curr.x || prev.x < curr.x && next.x > curr.x) {
      return this.sprites.horizontalLeftRight;
    } else if (next.x < curr.x && prev.y > curr.y || prev.x < curr.x && next.y > curr.y) {
      return this.sprites.angleLeftDown;
    } else if (next.y < curr.y && prev.y > curr.y || prev.y < curr.y && next.y > curr.y) {
      return this.sprites.verticalUpDown;
    } else if (next.y < curr.y && prev.x < curr.x || prev.y < curr.y && next.x < curr.x) {
      return this.sprites.angleTopLeft;
    } else if (next.x > curr.x && prev.y < curr.y || prev.x > curr.x && next.y < curr.y) {
      return this.sprites.angleRightUp;
    } else if (next.y > curr.y && prev.x > curr.x || prev.y > curr.y && next.x > curr.x) {
      return this.sprites.angleDownRight;
    }
  }

  private loadSprites() {
    this.sprites = {
      headUp: this.game.snakeSpriteSheet.getSprite({ row: 0, column: 3 }),
      headRight: this.game.snakeSpriteSheet.getSprite({ row: 0, column: 4 }),
      headDown: this.game.snakeSpriteSheet.getSprite({ row: 1, column: 4 }),
      headLeft: this.game.snakeSpriteSheet.getSprite({ row: 1, column: 3 }),
      tailUp: this.game.snakeSpriteSheet.getSprite({ row: 2, column: 3 }),
      tailRight: this.game.snakeSpriteSheet.getSprite({ row: 2, column: 4 }),
      tailDown: this.game.snakeSpriteSheet.getSprite({ row: 3, column: 4 }),
      tailLeft: this.game.snakeSpriteSheet.getSprite({ row: 3, column: 3 }),
      horizontalLeftRight: this.game.snakeSpriteSheet.getSprite({ row: 0, column: 1 }),
      verticalUpDown: this.game.snakeSpriteSheet.getSprite({ row: 1, column: 2 }),
      angleDownRight: this.game.snakeSpriteSheet.getSprite({ row: 0, column: 0 }),
      angleLeftDown: this.game.snakeSpriteSheet.getSprite({ row: 0, column: 2 }),
      angleRightUp: this.game.snakeSpriteSheet.getSprite({ row: 1, column: 0 }),
      angleTopLeft: this.game.snakeSpriteSheet.getSprite({ row: 2, column: 2 }),
    }
  }
}
