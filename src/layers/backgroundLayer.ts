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
        const cell = this.scene.tileMap.getCell({ x: i, y: j });
        if (i === 0 || i === w - 1 || j === 0 || j === h - 1) {
          this.game.renderer.drawTileSprite(this.groundSprites.ground, cell);
          this.game.renderer.drawTileSprite(this.wallSprites.stone, cell);
        } else {
          this.game.renderer.drawTileSprite(this.groundSprites.sand, cell);
        }
      }
    }
  }

  private fillCanvas() {
    const point = { x: 0, y: 0 };
    const dim = { width: this.game.width, height: this.game.height };
    this.game.renderer.fillRect(this.wallColor, point, dim);
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