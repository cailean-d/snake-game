import { GameOptions, ObjectTypes, Point } from './../interfaces';
import { Game } from './../core/game';
import { Snake } from './../objects/snake';
import { Apple } from './../objects/apple';

export class CollisionDetection<T extends GameOptions> {
  constructor(private game: Game<T>) {}

  withWalls() {
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<T>;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (
      head.x <= -1 ||
      head.y <= -1 ||
      head.x === this.game.canvas.width / this.game.options.size ||
      head.y === this.game.canvas.height / this.game.options.size
    ) {
      return true;
    }
    return false;
  }

  withTail() {
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<T>;
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
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<T>;
    const apple = this.game.objects.find(obj => obj.type === ObjectTypes.APPLE) as Apple<T>;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === apple.position.x && head.y === apple.position.y) {
      return true;
    }
    return false;
  }

  withPoint(point: Point) {
    const snake = this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake<T>;
    if (!snake) return false;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === point.x && head.y === point.y) {
      return true;
    }
    return false;
  }
}