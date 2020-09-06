import { Game } from '/core/game';
import { Dimension, Point, TileMapCell } from '/core/interfaces';
import { ObjectFitMinSide } from '/game/interfaces';
import { objectFitSide } from '/game/utils';
import { Sprite } from '/core/sprite';

export class TileMap<T> {
  constructor(private game: Game<T>, private mapSize: Dimension) {}

  public drawSprite(sprite: Sprite, position: Point) {
    const cell = this.getCell(position);
    this.game.ctx.drawImage(sprite.buffer, cell.x, cell.y, cell.width, cell.height);
  }

  public fill(color: string, position: Point) {
    const cell = this.getCell(position);
    this.game.ctx.fillStyle = color;
    this.game.ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
  }

  private getCell(pos: Point): TileMapCell {
    const canvasRatio = this.game.width / this.game.height;
    const mapRatio = this.mapSize.width / this.mapSize.height;

    let cellHeight: number;
    let cellWidth: number;

    const side = objectFitSide(canvasRatio, mapRatio);

    if (side === ObjectFitMinSide.WIDTH) {
      cellWidth = this.game.width / this.mapSize.width;
      cellHeight = cellWidth;
    } else {
      cellHeight = this.game.height / this.mapSize.height;
      cellWidth = cellHeight;
    }

    const hSpace = this.game.width - cellWidth * this.mapSize.width;
    const vSpace = this.game.height - cellHeight * this.mapSize.height;

    return {
      x: pos.x * cellWidth + hSpace / 2,
      y: pos.y * cellHeight + vSpace / 2,
      width: cellWidth,
      height: cellHeight,
    }
  }
}