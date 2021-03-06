export type KeyboardHandler = (params: KeyboardParams) => void;

export interface KeyboardParams {
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  key: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface AssetLoaderItems {
  key: string;
  url: string;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface Position {
  row: number;
  column: number;
}

export interface TileMapCell extends Point, Dimension {}

export type AssetLoaderItemsMap<T extends string> = Partial<Record<T, HTMLImageElement>>;

export type CoreObject<T> = CoreObjectTypes | T

export enum CoreObjectTypes { LAYER = 'LAYER' }

export interface LabelBackground {
  color: string;
  padding: number;
}
