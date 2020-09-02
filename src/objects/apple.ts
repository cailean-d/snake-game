import { Object, ObjectTypes, Point } from './../interfaces';
import { Game } from './../core/game';

export class Apple implements Object {
  public type: ObjectTypes;
  private position: Point;
  private size = 15;

  constructor() {
    this.type = ObjectTypes.APPLE;
  }

  public render(game: Game) {
    if (!this.position) this.generatePosition(game);
    this.drawCeil(game.ctx, this.position, '#d21313');
  }

  public generatePosition(game: Game) {
    this.position = {
      x: Math.round((Math.random() * (game.canvas.width - this.size)) / this.size),
      y: Math.round((Math.random() * (game.canvas.height - this.size)) / this.size),
    }
  }

  private drawCeil(ctx: CanvasRenderingContext2D, point: Point, color: string) {
    const x = point.x * this.size + this.size / 2;
    const y = point.y * this.size + this.size / 2;
    const radius = this.size / 2;
    const start = 0;
    const end = 2 * Math.PI;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end);
    ctx.fill();
  }
}
