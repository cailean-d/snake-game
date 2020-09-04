import { KeyboardHandler, KeyboardParams } from './../interfaces';

export class Input {
  constructor(private target: HTMLElement) {}

  onkeydown(handler: KeyboardHandler) {
    this.target.addEventListener('keydown', ({ shiftKey, ctrlKey, altKey, key }) => {
      const KEY = key.toUpperCase();
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key: KEY };
      handler(params);
    });
  }

  onkeyup(handler: KeyboardHandler) {
    this.target.addEventListener('keyup', ({ shiftKey, ctrlKey, altKey, key }) => {
      const KEY = key.toUpperCase();
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key: KEY };
      handler(params);
    });
  }

  onkeypress(handler: KeyboardHandler) {
    this.target.addEventListener('keypress', ({ shiftKey, ctrlKey, altKey, key }) => {
      const KEY = key.toUpperCase();
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key: KEY };
      handler(params);
    });
  }
}

export enum KEY {
  ESC = 'ESCAPE',
  ENTER = 'ENTER',
  SPACE = ' ',
  SHIFT = 'SHIFT',
  CTRL = 'CONTROL',
  ALT = 'AAL',
  NUM_1 = '1',
  NUM_2 = '2',
  NUM_3 = '3',
  NUM_4 = '4',
  NUM_5 = '5',
  NUM_6 = '6',
  NUM_7 = '7',
  NUM_8 = '8',
  NUM_9 = '9',
  NUM_0 = '0',
  Q = 'Q',
  W = 'W',
  E = 'E',
  R = 'R',
  T = 'T',
  Y = 'Y',
  U = 'U',
  I = 'I',
  O = 'O',
  P = 'P',
  A = 'A',
  S = 'S',
  D = 'D',
  F = 'F',
  G = 'G',
  H = 'H',
  J = 'J',
  K = 'K',
  L = 'L',
  Z = 'Z',
  X = 'X',
  C = 'C',
  V = 'V',
  B = 'B',
  N = 'N',
  M = 'M',
  ARROW_LEFT = 'ARROWLEFT',
  ARROW_UP = 'ARROWUP',
  ARROW_RIGHT = 'ARROWRIGHT',
  ARROW_DOWN = 'ARROWDOWN',
}
