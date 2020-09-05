import { CoreObject } from '/core/interfaces';

export abstract class GameObject<T> {
  public type: CoreObject<T>;
  calculate(): void {};
  render(): void {};
}