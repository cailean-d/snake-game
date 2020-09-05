import { Scene } from './scene';

export abstract class Game<T> {
  protected _frameDelta: number;
  protected _lastTimestamp: number;
  protected _scene: Scene<T>;

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get ctx() {
    return this.canvas.getContext('2d');
  }

  get frameDelta() {
    return this._frameDelta;
  }

  constructor(protected canvas: HTMLCanvasElement) {
    this.canvas.tabIndex = 0;
    this._frameDelta = 0;
    this._lastTimestamp = 0;
  }

  setScene(scene: Scene<T>) {
    this._scene = scene;
  }

  start() {
    this.canvas.focus();
    this.render();
  }

  private render(timestamp = 0) {
    this.tick(timestamp);
    requestAnimationFrame(t => this.render(t));
  }
  
  protected tick(timestamp: number) {
    this.updateTime(timestamp);
    if (this._scene) this._scene.render();
  }

  private updateTime(timestamp: number) {
    this._frameDelta = this._lastTimestamp > 0 ? timestamp - this._lastTimestamp : 0;
    this._lastTimestamp = timestamp;
  }
}
