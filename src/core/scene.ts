import { Game } from '/core/game';
import { GameObject } from '/core/gameObject';
import { Layer } from '/core/layer';
import { CoreObjectTypes } from '/core/interfaces';

export abstract class Scene<T> {
  public isPaused: boolean;
  protected objects: GameObject<T>[];

  constructor(public game: Game<T>) {
    this.objects = [];
    this.isPaused = false;
  }

  public getObject(type: T) {
    for (const o of this.objects) {
      const layer = o as Layer<T>;
      const layerType = CoreObjectTypes.LAYER;
      const obj = o.type === layerType ? layer.getObject(type) : o;
      if (obj?.type === type) return obj;
    }
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
