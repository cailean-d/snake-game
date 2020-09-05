import { GameScene } from '/game/gameScene';
import { SnakeGame } from '/game/snakeGame';
import { Apple } from '/objects/apple';
import { Snake } from '/objects/snake';
import { Point } from '/core/interfaces';
import { ObjectTypes } from '/game/interfaces';

export class CollisionDetection {
  constructor(private game: SnakeGame) {}

  withWalls(scene: GameScene) {
    const snake = scene.getObject(ObjectTypes.SNAKE) as Snake;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (
      head.x <= 0 ||
      head.y <= 0 ||
      head.x >= this.game.options.mapSize.width - 1 ||
      head.y >= this.game.options.mapSize.height - 1
    ) {
      return true;
    }
    return false;
  }

  withTail(scene: GameScene) {
    const snake = scene.getObject(ObjectTypes.SNAKE) as Snake;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    const tail = snake.snakeTail.slice(0, -1);
    for (const point of tail) {
      if (head.x === point.x && head.y === point.y) {
        return true;
      }
    }
    return false;
  }

  withApple(scene: GameScene) {
    const snake = scene.getObject(ObjectTypes.SNAKE) as Snake;
    const apple = scene.getObject(ObjectTypes.APPLE) as Apple;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === apple.position.x && head.y === apple.position.y) {
      return true;
    }
    return false;
  }

  withPoint(scene: GameScene, point: Point) {
    const snake = scene.getObject(ObjectTypes.SNAKE) as Snake;
    if (!snake) return false;
    const head = snake.snakeTail[snake.snakeTail.length - 1];
    if (head.x === point.x && head.y === point.y) {
      return true;
    }
    return false;
  }
}