import { Dimension, Position, TileMapCell } from './interfaces';

export class SpriteSheet {
  private image: HTMLImageElement;
  private tileSize: Dimension;

  constructor(private ctx: CanvasRenderingContext2D) {}

  loadTileSet(image: HTMLImageElement, tileSize: Dimension) {
    this.image = image;
    this.tileSize = tileSize;
  }

  draw(tilePosition: Position, tile: TileMapCell) {
    this.ctx.drawImage(
      this.image,
      tilePosition.column * this.tileSize.width,
      tilePosition.row * this.tileSize.height,
      this.tileSize.width,
      this.tileSize.height,
      tile.x, 
      tile.y, 
      tile.width, 
      tile.height
    )
  }
}