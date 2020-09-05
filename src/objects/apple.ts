import { SnakeGame } from '/game/snakeGame';
import { GameScene } from '/game/gameScene';
import { GameObject, Point } from '/core/interfaces';
import { ObjectTypes, AppleSprites } from '/game/interfaces';

export class Apple implements GameObject<ObjectTypes> {
  public type: ObjectTypes;
  public position: Point;
  private sprites: AppleSprites;

  constructor(private game: SnakeGame, private scene: GameScene) {
    this.type = ObjectTypes.APPLE;
    this.generatePosition();
    this.loadSprites();
  }

  public render() {
    this.scene.tileMap.drawSprite(this.sprites.apple, this.position);
  }

  public generatePosition() {
    let position: Point;
    do {
      position = {
        x: Math.floor(Math.random() * this.game.options.mapSize.width),
        y: Math.floor(Math.random() * this.game.options.mapSize.height),
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
    return this.game.collision.withPoint(this.scene, point);
  }

}
