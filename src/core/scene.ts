import { Game } from './game';
import { GameObject } from './interfaces';

export abstract class Scene<T> {
  private objects: GameObject<T>[];

  constructor(public game: Game<T>) {
    this.objects = [];
  }

  public getObject(type: T) {
    return this.objects.find(obj => obj.type === type);
  }

  public addObject(o: GameObject<T>) {
    this.objects.push(o);
  }

  public render() {
    this.clearCanvas();
    this.objects.forEach(obj => obj.render());
  }
  
  private clearCanvas() {
    this.game.ctx.fillStyle = "#fff";
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }
}
