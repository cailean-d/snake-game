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
}

export type SnakeGameAssets = 'snakeTile';
