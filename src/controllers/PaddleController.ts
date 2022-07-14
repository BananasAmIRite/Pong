import Paddle from '../entities/Paddle';
import Entity from '../Entity';
import EntityController from '../EntityController';

export default class PaddleController extends EntityController<Paddle> {
  onCollide(entity: Entity): void {}
  control(): void {}
}
