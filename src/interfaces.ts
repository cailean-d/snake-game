import { Game } from './core/game';

export type KeyboardHandler = (params: KeyboardParams) => void;

export interface KeyboardParams {
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  key: string;
}

export interface Object {
  render(game: Game): void;
}

export enum ObjectTypes {
  SNAKE,
  APPLE,
}
