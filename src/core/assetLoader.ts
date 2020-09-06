import { AssetLoaderItems, AssetLoaderItemsMap } from '/core/interfaces';

export class AssetLoader<T extends string> {
  private items: AssetLoaderItems[];

  constructor() {
    this.items = [];
  }

  public add(key: T, url: string) {
    this.items.push({ key, url });
    return this;
  }

  public async load(): Promise<AssetLoaderItemsMap<T>> {
    const promises: Promise<HTMLImageElement>[] = [];
    const itemsMap: AssetLoaderItemsMap<T> = {};
    this.items.forEach(item => promises.push(this.loadImage(item.url)));
    const images = await Promise.all(promises);
    this.items.forEach((item, i) => itemsMap[item.key] = images[i]);
    return itemsMap;
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }
}
