import { GameObject } from '/core/gameObject';
import { ObjectTypes } from '/game/interfaces';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { Label } from '/core/label';

export class Score extends GameObject<ObjectTypes> {
  public type: ObjectTypes;

  constructor(private game: SnakeGame, private scene: GameScene) {
    super();
    this.type = ObjectTypes.SCORE;
  }
  
  public render() {
    this.drawText();
  }

  private drawText() {
    const text = `SCORE: ${this.game.score}`;
    const size = this.game.width / 50;
    const point =  { x: 5, y: 5 };
    const bg = { color: 'rgba(0, 0, 0, 0.5)', padding: 5 };
    const label = new Label(text, '#fff', size, 'PixelBoy', 'normal', 'left', 'middle', bg);
    this.game.renderer.drawLabel(label, point);
  }
}