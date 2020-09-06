import { Game } from '/core/game';
import { AssetLoader } from '/core/assetLoader';
import { SpriteSheet } from '/core/spriteSheet';
import { GameScene } from '/scenes/gameScene';
import { CollisionDetection } from '/game/collision';
import { objectFitSide } from '/game/utils';
import { ObjectTypes, GameOptions } from '/game/interfaces';
import { AssetLoaderItemsMap } from '/core/interfaces';
import { SnakeGameAssets, ObjectFitMinSide } from '/game/interfaces';
import { GameMenuScene } from '/scenes/gameMenuScene';
import { GameOverScene } from '/scenes/gameOverScene';
import { Renderer } from '/core/renderer';
import snakeTile from '/assets/images/snake-tiles.png';
import stoneTile from '/assets/images/stone-tiles.png';
import groundTile from '/assets/images/ground-tiles.png';
import logo from '/assets/images/logo.png';

const defaultOptions: GameOptions = {
  size: 15, snakeLength: 5, timeThreshold: 100, mapSize: { width: 32, height: 18 }
}

export class SnakeGame extends Game<ObjectTypes> {
  public options: GameOptions;
  public collision: CollisionDetection;
  public renderer: Renderer<ObjectTypes>;
  public snakeSpriteSheet: SpriteSheet;
  public stoneSpriteSheet: SpriteSheet;
  public groundSpriteSheet: SpriteSheet;
  public assets: AssetLoaderItemsMap<SnakeGameAssets>;
  public score: number;
  public defaultScore: number;
  private _assetLoader: AssetLoader<SnakeGameAssets>;
  private _prevParentRatio: number;

  constructor(canvas: HTMLCanvasElement, options?: GameOptions) {
    super(canvas);
    this.collision = new CollisionDetection(this);
    this.renderer = new Renderer(this);
    this.snakeSpriteSheet = new SpriteSheet();
    this.stoneSpriteSheet = new SpriteSheet();
    this.groundSpriteSheet = new SpriteSheet();
    this._assetLoader = new AssetLoader();
    this.score = 0;
    this.defaultScore = 5;
    this.mergeOptions(options);
    this.prepareAssets();
  }
    
  public async start() {
    this.assets = await this._assetLoader.load();
    this.loadSpriteSheets();
    this.setMenuScene();
    super.start();
  }

  public restart() {
    this.score = 0;
    this.setGameScene();
  }

  public setMenuScene() {
    const gameMenu = new GameMenuScene(this);
    this.setScene(gameMenu);
  }

  public setGameScene() {
    const gameScene = new GameScene(this);
    this.setScene(gameScene);
  }

  public setGameOverScene() {
    const gameOverScene = new GameOverScene(this);
    this.setScene(gameOverScene);
  }

  public scoreUp(currentThreshold: number) {
    const defaultThreshold = this.options.timeThreshold;
    this.score += Math.round(defaultThreshold * this.defaultScore / currentThreshold);
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
    this._assetLoader.add('stoneTile', stoneTile);
    this._assetLoader.add('groundTile', groundTile);
    this._assetLoader.add('logo', logo);
  }

  private loadSpriteSheets() {
    this.snakeSpriteSheet.loadTileSet(this.assets.snakeTile, { width: 64, height: 64 });
    this.stoneSpriteSheet.loadTileSet(this.assets.stoneTile, { width: 64, height: 64 });
    this.groundSpriteSheet.loadTileSet(this.assets.groundTile, { width: 32, height: 32 });
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