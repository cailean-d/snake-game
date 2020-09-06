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
    let x = position.x;
    let y = position.y;
    let padding = 0;

    this.game.ctx.textAlign = 'left';
    this.game.ctx.textBaseline = 'top';
    this.game.ctx.font = `${label.style} ${label.size}px ${label.font}`;

    const textWidth = this.game.ctx.measureText(label.text).width;
    const textHeight = 3 / 4 * label.size;

    if (label.align === 'center') {
      x = position.x - textWidth / 2;
    } else if (label.align === 'right') {
      x = position.x - textWidth;
    }

    if (label.baseLine === 'middle') {
      y = position.y - (textHeight / 2)
    } else if (label.baseLine === 'bottom') {
      y = position.y -(textHeight)
    }

    if (label.background) {
      padding = label.background.padding;
      const dim = { width: textWidth + padding * 2, height: textHeight + padding * 2 };
      this.fillRect(label.background.color, { x, y }, dim);
    }

    this.game.ctx.fillStyle = label.color;
    this.game.ctx.fillText(label.text, x + padding, y + padding);
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
