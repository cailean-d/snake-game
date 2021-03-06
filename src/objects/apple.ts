import { GameObject } from '/core/gameObject';
import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/scenes/gameScene';
import { Snake } from '/objects/snake';
import { randomInt } from '/game/utils';
import { Point } from '/core/interfaces';
import { ObjectTypes, AppleSprites } from '/game/interfaces';

export class Apple extends GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public position: Point;
  private sprites: AppleSprites;

  constructor(private game: SnakeGame, private scene: GameScene) {
    super();
    this.type = ObjectTypes.APPLE;
    this.generatePosition();
    this.loadSprites();
  }

  public render() {
    const cell = this.scene.tileMap.getCell(this.position);
    this.game.renderer.drawTileSprite(this.sprites.apple, cell);
  }

  public generatePosition() {
    let position: Point;
    do {
      position = {
        x: randomInt(1, this.game.options.mapSize.width - 1),
        y: randomInt(1, this.game.options.mapSize.height - 1),
      }
    } while(this.checkCollision(position));
    this.position = position;
  }

  private loadSprites() {
    this.sprites = {
      apple: this.game.snakeSpriteSheet.getSprite({ row: 3, column: 0 })
    }
  }

  private checkCollision(point: Point) {
    const snake = this.scene.getObject(ObjectTypes.SNAKE) as Snake;
    if (snake) {
      return this.game.collision.withPoint(this.scene, point);
    } else {
      return this.game.collision.withSnakeStartPosition(point);
    }
  }
}
