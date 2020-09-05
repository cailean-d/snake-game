export abstract class GameObject<T> {
  public type: T;
  calculate(): void {};
  render(): void {};
}