import { Game } from './core/game';

export type KeyboardHandler = (params: KeyboardParams) => void;

export interface KeyboardParams {
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  key: string;
}

export interface Object {
  type: ObjectTypes;
  render(game: Game): void;
}

export enum ObjectTypes {
  SNAKE,
  APPLE,
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