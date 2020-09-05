import { GameObject, Point } from '/core/interfaces';
import { ObjectTypes} from '/game/interfaces';
import { GameSnake } from '/game/gameSnake';
import { CollisionDetection } from '/game/collision';

export class Apple implements GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public position: Point;
  private collision: CollisionDetection;

  constructor(private gameSnake: GameSnake) {
    this.type = ObjectTypes.APPLE;
    this.collision = new CollisionDetection(this.gameSnake);
    this.generatePosition();
  }

  public render() {
    // this.drawCeil(this.position, '#d21313');

    // for (let i = 0; i < this.gameSnake.options.mapSize.width; i++) {
    //   for (let j = 0; j < this.gameSnake.options.mapSize.height; j++) {
    //     const cell = this.gameSnake.tileMap.getCell({ row: j, column: i });
    //     this.gameSnake.snakeSpriteSheet.draw({ row: 1, column: 4 }, cell);
    //   }
    // }
    const tilePosition = { row: 3, column: 0 };
    const cell = this.gameSnake.tileMap.getCell({ row: this.position.y, column: this.position.x });
    const sprite = this.gameSnake.snakeSpriteSheet.getSprite(tilePosition);
    this.gameSnake.ctx.drawImage(sprite.buffer, cell.x, cell.y, cell.width, cell.height);
    // this.gameSnake.snakeSpriteSheet.draw({ row: 3, column: 0 }, cell);
  }

  public reset() {
    this.generatePosition();
  }

  public generatePosition() {
    const g = this.gameSnake;
    let position: Point;
    do {
      // position = {
      //   x: Math.round((Math.random() * (g.width - g.options.size)) / g.options.size),
      //   y: Math.round((Math.random() * (g.height - g.options.size)) / g.options.size),
      // }
      position = {
        x: Math.floor(Math.random() * this.gameSnake.options.mapSize.width),
        y: Math.floor(Math.random() * this.gameSnake.options.mapSize.height),
      }
    } while(this.checkCollision(position));
    this.position = position;
  }

  private checkCollision(point: Point) {
    return this.collision.withPoint(point);
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
}
