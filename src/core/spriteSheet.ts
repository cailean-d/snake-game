import { Dimension, Position, TileMapCell } from './interfaces';

export class SpriteSheet {
  private image: HTMLImageElement;
  private tileSize: Dimension;

  constructor(private ctx: CanvasRenderingContext2D) {}

  loadTileSet(image: HTMLImageElement, tileSize: Dimension) {
    this.image = image;
    this.tileSize = tileSize;
  }

  draw(tile: Position, cell: TileMapCell) {
    this.ctx.drawImage(
      this.image,
      tile.column * this.tileSize.width,
      tile.row * this.tileSize.height,
      this.tileSize.width,
      this.tileSize.height,
      cell.x, 
      cell.y, 
      cell.width, 
      cell.height
    )
  }
}