import { Sprite } from '/core/sprite';
import { Dimension } from '/core/interfaces';

export enum ObjectTypes {
  SNAKE = 'SNAKE',
  APPLE = 'APPLE',
  SCORE = 'SCORE',
  BACKGROUND = 'BACKGROUND'
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

export enum ObjectFitMinSide {
  WIDTH,
  HEIGHT
}

export interface AppleSprites {
  apple: Sprite;
}

export interface SnakeSprites {
  headUp: Sprite;
  headRight: Sprite;
  headDown: Sprite;
  headLeft: Sprite;
  tailUp: Sprite;
  tailRight: Sprite;
  tailDown: Sprite;
  tailLeft: Sprite;
  horizontalLeftRight: Sprite;
  verticalUpDown: Sprite;
  angleLeftDown: Sprite;
  angleTopLeft: Sprite;
  angleRightUp: Sprite;
  angleDownRight: Sprite;
}

export type SnakeGameAssets = 'snakeTile';
