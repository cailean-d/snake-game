import { Layer } from '/core/layer';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { ObjectTypes, WallSprites, GroundSprites } from '/game/interfaces';
import { range } from '/game/utils';

export class BackgroundLayer extends Layer<ObjectTypes> {
  private wallColor: string;
  private wallSprites: WallSprites;
  private groundSprites: GroundSprites;

  constructor(protected game: SnakeGame, protected scene: GameScene) {
    super(game, scene);
    this.wallColor = '#e3bc72';
    this.loadSprites();
  }

  public render() {
    this.fillCanvas();
    const w = this.game.options.mapSize.width;
    const h = this.game.options.mapSize.height;
    for (const i of range(0, w)) {
      for (const j of range(0, h)) {
        if (i === 0 || i === w - 1 || j === 0 || j === h - 1) {
          this.scene.tileMap.drawSprite(this.groundSprites.ground, { x: i, y: j });
          this.scene.tileMap.drawSprite(this.wallSprites.stone, { x: i, y: j });
        } else {
          this.scene.tileMap.drawSprite(this.groundSprites.sand, { x: i, y: j });
        }
      }
    }
  }

  private fillCanvas() {
    this.game.ctx.fillStyle = this.wallColor;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }

  private loadSprites() {
    this.wallSprites = {
      stone: this.game.stoneSpriteSheet.getSprite({ row: 3, column: 7 })
    };
    this.groundSprites = {
      sand: this.game.groundSpriteSheet.getSprite({ row: 6, column: 0 }),
      ground: this.game.groundSpriteSheet.getSprite({ row: 3, column: 0 })
    }
  }
}