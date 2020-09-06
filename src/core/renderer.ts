import { Game } from '/core/game';
import { Label } from '/core/label';
import { Sprite } from '/core/sprite';
import { Point, Dimension, TileMapCell } from '/core/interfaces';

export class Renderer<T> {
  constructor(private game: Game<T>) {}

  public fillRect(color: string, position: Point, size: Dimension) {
    this.game.ctx.fillStyle = color;
    this.game.ctx.fillRect(position.x, position.y, size.width, size.height);
  }

  public drawLabel(label: Label, position: Point) {
    let padding = 0;
    this.game.ctx.textAlign = label.align;
    this.game.ctx.textBaseline = label.baseLine;
    this.game.ctx.font = `${label.style} ${label.size}px ${label.font}`;
    if (label.background) {
      padding = label.background.padding;
      const textWidth = this.game.ctx.measureText(label.text).width;
      const textHeight = 3 / 4 * label.size;
      const dim = { width: textWidth + padding * 2, height: textHeight + padding * 2 };
      this.fillRect(label.background.color, position, dim);
    } 
    this.game.ctx.fillStyle = label.color;
    this.game.ctx.fillText(label.text, position.x + padding, position.y + padding);
  }

  public fillTile(color: string, cell: TileMapCell) {
    this.game.ctx.fillStyle = color;
    this.game.ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
  }

  public drawTileSprite(sprite: Sprite, cell: TileMapCell) {
    this.game.ctx.drawImage(sprite.buffer, cell.x, cell.y, cell.width, cell.height);
  }

  public drawImage(image: CanvasImageSource, position: Point, dim: Dimension) {
    const x = position.x;
    const y = position.y;
    const w = dim.width;
    const h = dim.height;
    this.game.ctx.drawImage(image, x, y, w, h);
  }
}
