export class Sprite {
  public width: number;
  public height: number;

  constructor(public buffer: CanvasImageSource) {
    this.width = buffer.width as number;
    this.height = buffer.height as number;
  }
}
