import { Game } from '/core/game';
import { ObjectFitMinSide } from '/game/interfaces';
import { objectFitSide } from '/game/utils';
import { Dimension, Point, TileMapCell } from '/core/interfaces';

export class TileMap<T> {
  constructor(private game: Game<T>, private mapSize: Dimension) {}

  public getCell(pos: Point): TileMapCell {
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