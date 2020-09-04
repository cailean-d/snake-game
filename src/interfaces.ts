export type KeyboardHandler = (params: KeyboardParams) => void;

export interface KeyboardParams {
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  key: string;
}

export interface Object<T> {
  type: ObjectTypes;
  render(): void;
  reset(): void;
}

export enum ObjectTypes {
  SNAKE,
  APPLE,
  SCORE,
}

export interface Point {
  x: number;
  y: number;
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

export interface AssetLoaderItems {
  key: string;
  url: string;
}

export type AssetLoaderItemsMap<T extends string> = Partial<Record<T, HTMLImageElement>>;
export type SnakeGameAssets = 'snakeTile';