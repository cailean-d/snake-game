import { Game } from './game';
import { GameObject } from '/core/gameObject';

export abstract class Scene<T> {
  public isPaused: boolean;
  private objects: GameObject<T>[];

  constructor(public game: Game<T>) {
    this.objects = [];
    this.isPaused = false;
  }

  public getObject(type: T) {
    return this.objects.find(obj => obj.type === type);
  }

  public addObject(o: GameObject<T>) {
    this.objects.push(o);
  }

  public render() {
    this.clearCanvas();
    if (!this.isPaused) this.objects.forEach(obj => obj.calculate());
    this.objects.forEach(obj => obj.render());
  }
  
  private clearCanvas() {
    this.game.ctx.fillStyle = "#fff";
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }
}
