import { ObjectFitMinSide } from './interfaces';

export function objectFitSide(parentRatio: number, childRatio = 16 / 9): ObjectFitMinSide {
  if (
    (parentRatio < 1 && childRatio > 1) ||
    (parentRatio > 1 && childRatio > 1 && childRatio > parentRatio) ||
    (parentRatio < 1 && childRatio < 1 && childRatio > parentRatio) ||
    (parentRatio < 1 && childRatio === 1) ||
    (parentRatio === 1 && childRatio > 1) ||
    (parentRatio === 1 && childRatio === 1)
  ) {
    return ObjectFitMinSide.WIDTH;
  } else {
    return ObjectFitMinSide.HEIGHT;
  } 
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}