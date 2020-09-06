import { Game } from '/core/game';
import { Scene } from '/core/scene';
import { GameObject } from '/core/gameObject';
import { CoreObjectTypes } from '/core/interfaces';

export abstract class Layer<T> extends GameObject<T> {
  protected objects: GameObject<T>[];

  constructor(protected game: Game<T>, protected scene: Scene<T>) {
    super();
    this.type = CoreObjectTypes.LAYER;
    this.objects = [];
  }
  
  public getObject(type: T) {
    for (const o of this.objects) {
      const layer = o as Layer<T>;
      const layerType = CoreObjectTypes.LAYER;
      const obj = o.type === layerType ? layer.getObject(type) : o;
      if (obj.type === type) return obj;
    }
  }

  public addObject(o: GameObject<T>) {
    this.objects.push(o);
  }

  public calculate() {
    if (!this.scene.isPaused) this.objects.forEach(obj => obj.calculate());
  }

  public render() {
    this.objects.forEach(obj => obj.render());
  }
}
