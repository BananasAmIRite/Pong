import Entity from './Entity';
import EntityController from './EntityController';

export default class EmptyEntityController extends EntityController<Entity> {
  onCollide(entity: Entity): void {}
  control(): void {}
}
