import { Scene } from '/core/scene';

export abstract class Game<T> {
  public frameDelta: number;
  protected lastTimestamp: number;
  protected scene: Scene<T>;

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get ctx() {
    return this.canvas.getContext('2d');
  }

  constructor(protected canvas: HTMLCanvasElement) {
    this.canvas.tabIndex = 0;
    this.frameDelta = 0;
    this.lastTimestamp = 0;
  }

  public setScene(scene: Scene<T>) {
    this.scene = scene;
  }

  public start() {
    this.canvas.focus();
    this.render();
  }
  
  protected tick(timestamp: number) {
    this.updateTime(timestamp);
    if (this.scene) this.scene.render();
  }

  private render(timestamp = 0) {
    this.tick(timestamp);
    requestAnimationFrame(t => this.render(t));
  }

  private updateTime(timestamp: number) {
    this.frameDelta = this.lastTimestamp > 0 ? timestamp - this.lastTimestamp : 0;
    this.lastTimestamp = timestamp;
  }
}
