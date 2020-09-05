import { Dimension, Position } from './interfaces';
import { Sprite } from './sprite';

export class SpriteSheet {
  private image: HTMLImageElement;
  private tileSize: Dimension;

  loadTileSet(image: HTMLImageElement, tileSize: Dimension) {
    this.image = image;
    this.tileSize = tileSize;
  }

  getSprite(tile: Position) {
    const buffer = document.createElement('canvas');
    buffer.width = this.tileSize.width;
    buffer.height = this.tileSize.height;
    const sx = tile.column * this.tileSize.width;
    const sy = tile.row * this.tileSize.height;
    const sw = this.tileSize.width;
    const sh = this.tileSize.height;
    const dx = 0;
    const dy = 0;
    const dw = this.tileSize.width;
    const dh = this.tileSize.height;
    buffer.getContext('2d').drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    return new Sprite(buffer);
  }
}
