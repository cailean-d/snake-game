import { Game } from '/core/game';
import { Dimension, Position, TileMapCell } from './interfaces';

export class TileMap<T> {
  constructor(private game: Game<T>, private mapSize: Dimension) {}

  public getCell(pos: Position): TileMapCell {
    const canvasRatio = this.game.canvas.width / this.game.canvas.height;
    const mapRatio = this.mapSize.width / this.mapSize.height;

    let cellHeight: number;
    let cellWidth: number;

    if (
      (canvasRatio < 1 && mapRatio > 1) ||
      (canvasRatio > 1 && mapRatio > 1 && mapRatio > canvasRatio) ||
      (canvasRatio < 1 && mapRatio < 1 && mapRatio > canvasRatio) ||
      (canvasRatio < 1 && mapRatio === 1) ||
      (canvasRatio === 1 && mapRatio > 1) ||
      (canvasRatio === 1 && mapRatio === 1)
    ) {
      cellWidth = Math.floor(this.game.canvas.width / this.mapSize.width);
      cellHeight = cellWidth;
    } else {
      cellHeight = Math.floor(this.game.canvas.height / this.mapSize.height);
      cellWidth = cellHeight;
    } 

    const hSpace = this.game.canvas.width - cellWidth * this.mapSize.width;
    const vSpace = this.game.canvas.height - cellHeight * this.mapSize.height;

    return {
      x: pos.column * cellWidth + hSpace / 2,
      y: pos.row * cellHeight + vSpace / 2,
      width: cellWidth,
      height: cellHeight,
    }
  }
}