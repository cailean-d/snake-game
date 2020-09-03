import { Object, ObjectTypes, Point, GameOptions } from './../interfaces';
import { Game } from './../core/game';

export class Apple<T extends GameOptions> implements Object<T> {
  public type: ObjectTypes;
  public position: Point;

  constructor(private game: Game<T>) {
    this.type = ObjectTypes.APPLE;
    this.generatePosition();
  }

  public render() {
    this.drawCeil(this.position, '#d21313');
  }

  public generatePosition() {
    const g = this.game;
    this.position = {
      x: Math.round((Math.random() * (g.canvas.width - g.options.size)) / g.options.size),
      y: Math.round((Math.random() * (g.canvas.height - g.options.size)) / g.options.size),
    }
  }

  private drawCeil(point: Point, color: string) {
    const g = this.game;
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
