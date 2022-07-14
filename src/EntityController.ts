import Entity from './Entity';

export default abstract class EntityController<E extends Entity> {
  protected entity: E;

  constructor(entity: E) {
    this.entity = entity;
  }

  abstract control(): void;

  abstract onCollide(entity: Entity): void;
}
