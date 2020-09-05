import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { ObjectTypes } from '/game/interfaces';
import { range } from '/game/utils';

export class BackgroundLayer extends Layer<ObjectTypes> {
  private wallColor: string;
  private groundColor: string;

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.wallColor = '#bcae76';
    this.groundColor = '#f7e697';
  }

  public render() {
    this.fillCanvas();
    const w = (this.game ).options.mapSize.width;
    const h = this.game.options.mapSize.height;
    for (const i of range(0, w)) {
      for (const j of range(0, h)) {
        if (i === 0 || i === w - 1 || j === 0 || j === h - 1) {
          this.scene.tileMap.fill(this.wallColor, { x: i, y: j })
        } else {
          this.scene.tileMap.fill(this.groundColor, { x: i, y: j })
        }
      }
    }
  }

  private fillCanvas() {
    this.game.ctx.fillStyle = this.wallColor;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }
}