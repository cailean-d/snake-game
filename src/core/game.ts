import { Input } from './input';
import { Object } from './../interfaces';

export class Game {
  public input: Input;
  public ctx: CanvasRenderingContext2D;
  public objects: Object[];
  public frameDelta: number;
  private lastTimestamp: number;

  constructor(private canvas: HTMLCanvasElement) {
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

  public addObject(o: Object) {
    this.objects.push(o);
  }

  private render(timestamp = 0) {
    this.clearCanvas();
    this.updateTime(timestamp);
    this.objects.forEach(obj => obj.render(this));
    requestAnimationFrame(t => this.render(t));
  }
  
  private clearCanvas() {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateTime(timestamp: number) {
    this.frameDelta = this.lastTimestamp > 0 ? timestamp - this.lastTimestamp : 1;
    this.lastTimestamp = timestamp;
  }

}