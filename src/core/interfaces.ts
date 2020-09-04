export type KeyboardHandler = (params: KeyboardParams) => void;

export interface KeyboardParams {
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  key: string;
}

export interface GameObject<T> {
  type: T;
  render(): void;
  reset(): void;
}

export interface Point {
  x: number;
  y: number;
}

export interface AssetLoaderItems {
  key: string;
  url: string;
}

export type AssetLoaderItemsMap<T extends string> = Partial<Record<T, HTMLImageElement>>;