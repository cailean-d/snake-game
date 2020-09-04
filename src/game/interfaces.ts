import { Dimension } from '/core/interfaces';

export enum ObjectTypes {
  SNAKE,
  APPLE,
  SCORE,
}

export enum SnakeDirection {
  LEFT,
  UP,
  RIGHT,
  DOWN,
}

export interface GameOptions {
  size: number;
  snakeLength: number;
  timeThreshold: number;
  mapSize: Dimension;
}

export type SnakeGameAssets = 'snakeTile';
