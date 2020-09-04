import { Input } from './input';
import { GameObject } from './interfaces';

export class Game<T> {
  public input: Input;
  public ctx: CanvasRenderingContext2D;
  public objects: GameObject<T>[];
  public frameDelta: number;
  private lastTimestamp: number;

  constructor(public canvas: HTMLCanvasElement) {
    this.canvas.tabIndex = 0;
    this.input = new Input(document.body);
    this.ctx = this.canvas.getContext('2d');
    this.objects = [];
    this.frameDelta = 0;
    this.lastTimestamp = 0;
  }

  public start() {
    this.canvas.focus();
    this.render();
  }

  public addObject(o: GameObject<T>) {
    this.objects.push(o);
  }

  private render(timestamp = 0) {
    this.updateCanvasSize();
    this.clearCanvas();
    this.updateTime(timestamp);
    this.objects.forEach(obj => obj.render());
    requestAnimationFrame(t => this.render(t));
  }
  
  private clearCanvas() {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateTime(timestamp: number) {
    this.frameDelta = this.lastTimestamp > 0 ? timestamp - this.lastTimestamp : 0;
    this.lastTimestamp = timestamp;
  }

  private updateCanvasSize() {
    this.canvas.height = parseInt(getComputedStyle(this.canvas).height);
    this.canvas.width = parseInt(getComputedStyle(this.canvas).width);
  }
}
