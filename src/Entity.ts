import EmptyEntityController from './EmptyEntityController';
import Ball from './entities/Ball';
import Paddle from './entities/Paddle';
import EntityController from './EntityController';
import PongGame from './PongGame';

export default abstract class Entity {
  protected width: number;
  protected height: number;

  private posX: number;
  private posY: number;

  private controller: EntityController<any> | null;

  private game: PongGame;

  constructor(game: PongGame, w: number, h: number) {
    this.game = game;
    this.width = w;
    this.height = h;
    this.posX = 0;
    this.posY = 0;

    this.controller = new EmptyEntityController(this);
  }

  get x() {
    return this.posX;
  }

  get y() {
    return this.posY;
  }

  get w() {
    return this.width;
  }

  get h() {
    return this.height;
  }

  public setPosition(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  public setPositionWithBounds(x: number, y: number) {
    if (x < 0 || x + this.w > this.getGame().getWidth() || y < 0 || y + this.h > this.getGame().getHeight()) return;
    this.setPosition(x, y);
  }

  //   setEntityController(controller: EntityController<this>) {
  setEntityController(controller: EntityController<any>) {
    this.controller = controller;
  }

  render(e: CanvasRenderingContext2D): void {
    this.controller?.control();
    for (const entity of this.game.getEntities()) {
      if (entity === this) continue;

      if (this.isCollidingWith(entity) && entity.isCollidingWith(this)) this.controller?.onCollide(entity);
    }
  }

  public getGame() {
    return this.game;
  }

  isCollidingWith(entity: Entity): boolean {
    return Entity.isColliding(this, entity);
  }

  static isColliding(e1: Entity, e2: Entity): boolean {
    return e1.x < e2.x + e2.w && e1.x + e1.w > e2.x && e1.y < e2.y + e2.h && e1.h + e1.y > e2.y; // copied from mozilla :)
  }
}
