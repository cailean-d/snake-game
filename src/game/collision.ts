import { Point } from '/core/interfaces';
import { GameSnake } from '/game/gameSnake';

export class CollisionDetection {
  constructor(private gameSnake: GameSnake) {}

  withWalls() {
    const snake = this.gameSnake.snake;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (
      head.x <= -1 ||
      head.y <= -1 ||
      head.x >= this.gameSnake.width / this.gameSnake.options.size ||
      head.y >= this.gameSnake.height / this.gameSnake.options.size
    ) {
      return true;
    }
    return false;
  }

  withTail() {
    const snake = this.gameSnake.snake;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    const tail = snake.snakeTail.slice(0, -1);
    for (const point of tail) {
      if (head.x === point.x && head.y === point.y) {
        return true;
      }
    }
    return false;
  }

  withApple() {
    const snake = this.gameSnake.snake;
    const apple = this.gameSnake.apple;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === apple.position.x && head.y === apple.position.y) {
      return true;
    }
    return false;
  }

  withPoint(point: Point) {
    const snake = this.gameSnake.snake;
    if (!snake) return false;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === point.x && head.y === point.y) {
      return true;
    }
    return false;
  }
}