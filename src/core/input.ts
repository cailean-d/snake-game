import { KeyboardHandler, KeyboardParams } from './../interfaces';

export class Input {
  constructor(private target: HTMLElement) {}

  onkeydown(handler: KeyboardHandler) {
    this.target.addEventListener('keydown', ({ shiftKey, ctrlKey, altKey, key }) => {
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key };
      handler(params);
    });
  }

  onkeyup(handler: KeyboardHandler) {
    this.target.addEventListener('keyup', ({ shiftKey, ctrlKey, altKey, key }) => {
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key };
      handler(params);
    });
  }

  onkeypress(handler: KeyboardHandler) {
    this.target.addEventListener('keypress', ({ shiftKey, ctrlKey, altKey, key }) => {
      const params: KeyboardParams = { shiftKey, ctrlKey, altKey, key };
      handler(params);
    });
  }
}

export enum KEY {
  ESC = 'Escape',
  ENTER = 'Enter',
  SPACE = ' ',
  SHIFT = 'Shift',
  CTRL = 'Control',
  ALT = 'Alt',
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
  ARROW_LEFT = 'ArrowLeft',
  ARROW_UP = 'ArrowUp',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_DOWN = 'ArrowDown',
}
