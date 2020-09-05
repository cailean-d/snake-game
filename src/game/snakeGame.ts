import { Game } from '/core/game';
import { AssetLoader } from '/core/assetLoader';
import { SpriteSheet } from '/core/spriteSheet';
import { GameScene } from '/game/gameScene';
import { CollisionDetection } from '/game/collision';
import { objectFitSide } from '/game/utils';
import { ObjectTypes, GameOptions } from '/game/interfaces';
import { AssetLoaderItemsMap } from '/core/interfaces';
import { SnakeGameAssets, ObjectFitMinSide } from '/game/interfaces';
import snakeTile from '/assets/snake-tiles.png';

const defaultOptions: GameOptions = {
  size: 15, snakeLength: 5, timeThreshold: 100, mapSize: { width: 32, height: 18 }
}

export class SnakeGame extends Game<ObjectTypes> {
  public options: GameOptions;
  public collision: CollisionDetection;
  public snakeSpriteSheet: SpriteSheet;
  private _assetLoader: AssetLoader<SnakeGameAssets>;
  private _assets: AssetLoaderItemsMap<SnakeGameAssets>;
  private _prevParentRatio: number;

  constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
    super(canvas);
    this.collision = new CollisionDetection(this);
    this.snakeSpriteSheet = new SpriteSheet();
    this._assetLoader = new AssetLoader();
    this.mergeOptions(options);
    this.prepareAssets();
  }
    
  public async start() {
    this._assets = await this._assetLoader.load();
    this.loadSpriteSheets();
    this.setFirstScene();
    super.start();
  }

  public restart() {
    this.setFirstScene();
  }

  protected tick(timestamp: number) {
    this.fluidCanvasSize();
    super.tick(timestamp);
  }

  private mergeOptions(options?: GameOptions) {
    this.options = Object.assign({}, defaultOptions, options || {});
  }

  private prepareAssets() {
    this._assetLoader.add('snakeTile', snakeTile);
  }

  private loadSpriteSheets() {
    this.snakeSpriteSheet.loadTileSet(this._assets.snakeTile, { width: 64, height: 64 });
  }

  private setFirstScene() {
    const gameScene = new GameScene(this);
    this.setScene(gameScene);
  }
  
  private fluidCanvasSize() {
    const parent = this.canvas.parentElement;
    const parentRatio = parent.clientWidth / parent.clientHeight;
    if (parentRatio !== this._prevParentRatio) {
      this._prevParentRatio = parentRatio;
      const side = objectFitSide(parentRatio);
      if (side === ObjectFitMinSide.WIDTH) {
        this.canvas.style.width = '100%';
        this.canvas.style.height = null;
        this.canvas.width = parseInt(getComputedStyle(this.canvas).width);
        this.canvas.height = this.canvas.width / (16 / 9);
      } else {
        this.canvas.style.height = '100%';
        this.canvas.style.width = null;
        this.canvas.height = parseInt(getComputedStyle(this.canvas).height);
        this.canvas.width = this.canvas.height * (16 / 9);
      }
    } 
  }
}