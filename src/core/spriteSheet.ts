import { Dimension, Position, Point } from './interfaces';

export class SpriteSheet {
  private image: HTMLImageElement;
  private tileSize: Dimension;

  constructor(private ctx: CanvasRenderingContext2D) {}

  loadTileSet(image: HTMLImageElement, tileSize: Dimension) {
    this.image = image;
    this.tileSize = tileSize;
  }

  draw(tilePosition: Position, position: Point) {
    this.ctx.drawImage(
      this.image,
      tilePosition.column * this.tileSize.width,
      tilePosition.row * this.tileSize.height,
      this.tileSize.width,
      this.tileSize.height,
      position.x * 15, position.y * 15, 
      15, 
      15
    )
  }
}