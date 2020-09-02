import { Input } from './input';

export class Game {
  public input = new Input(document.body);

  constructor(private canvas: HTMLCanvasElement) {

  }
}