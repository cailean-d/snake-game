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
    this.drawCeil(this.position, '#d21313');
  }

  public reset() {
    this.generatePosition();
  }

  public generatePosition() {
    const g = this.gameSnake;
    let position: Point;
    do {
      position = {
        x: Math.round((Math.random() * (g.width - g.options.size)) / g.options.size),
        y: Math.round((Math.random() * (g.height - g.options.size)) / g.options.size),
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
