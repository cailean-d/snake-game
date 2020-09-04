import { Game } from '/core/game';
import { AssetLoader } from '/core/assetLoader';
import { SpriteSheet } from '/core/spriteSheet';
import { TileMap } from '/core/tileMap';
import { KEY } from '/core/input';
import { Apple } from '/objects/apple';
import { Snake } from '/objects/snake';
import { Score } from '/objects/score';
import { AssetLoaderItemsMap, Dimension } from '/core/interfaces';
import { SnakeDirection, GameOptions, ObjectTypes, SnakeGameAssets } from '/game/interfaces';
import snakeTile from '/assets/snake-tiles.png';

export class GameSnake {
  public options: GameOptions;
  public snakeSpriteSheet: SpriteSheet;
  public tileMap: TileMap<ObjectTypes>;
  private assets: AssetLoaderItemsMap<SnakeGameAssets>;
  private assetLoader: AssetLoader<SnakeGameAssets>;
  private game: Game<ObjectTypes>;

  get snake() {
    return this.game.objects.find(obj => obj.type === ObjectTypes.SNAKE) as Snake;
  }

  get apple() {
    return this.game.objects.find(obj => obj.type === ObjectTypes.APPLE) as Apple;
  }

  get score() {
    return this.game.objects.find(obj => obj.type === ObjectTypes.SCORE) as Score;
  }

  get width() {
    return this.game.canvas.width;
  }

  get height() {
    return this.game.canvas.height;
  }

  get ctx() {
    return this.game.ctx;
  }

  get frameDelta() {
    return this.game.frameDelta;
  }

  get defaultOptions(): GameOptions {
    return { size: 15, snakeLength: 5, timeThreshold: 100, mapSize: { width: 30, height: 20 }};
  }

  constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
    this.mergeOptions(options);
    this.game = new Game<ObjectTypes>(canvas);
    this.assetLoader = new AssetLoader();
    this.snakeSpriteSheet = new SpriteSheet(this.ctx);
    this.tileMap = new TileMap(this.game, this.options.mapSize);
    this.prepareAssets();
    this.addObjects();
    this.setInput();
  }

  public async start() {
    this.assets = await this.assetLoader.load();
    this.loadSpriteSheets();
    this.game.start();
  }

  public restart() {
    for (const object of this.game.objects) {
      object.reset();
    }
  }

  private mergeOptions(options?: GameOptions) {
    this.options = Object.assign({}, this.defaultOptions, options || {});
  }

  private addObjects() {
    this.game.addObject(new Apple(this));
    this.game.addObject(new Snake(this));
    this.game.addObject(new Score(this));
  }

  private prepareAssets() {
    this.assetLoader.add('snakeTile', snakeTile);
  }

  private loadSpriteSheets() {
    const tileSize: Dimension = { width: 64, height: 64 };
    this.snakeSpriteSheet.loadTileSet(this.assets.snakeTile, tileSize);
  }

  private setInput() {
    this.game.input.onkeydown(params => {
      switch(params.key) {
        case KEY.ARROW_LEFT:
        case KEY.A:
          this.snake.turn(SnakeDirection.LEFT);
          break;
        case KEY.ARROW_UP:
        case KEY.W:
          this.snake.turn(SnakeDirection.UP);
          break;
        case KEY.ARROW_RIGHT:
        case KEY.D:
          this.snake.turn(SnakeDirection.RIGHT);
          break;
        case KEY.ARROW_DOWN:
        case KEY.S:
          this.snake.turn(SnakeDirection.DOWN);
          break;
      }
    });
  }
}