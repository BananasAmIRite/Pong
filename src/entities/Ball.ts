import BallController from '../controllers/BallController';
import Entity from '../Entity';
import PongGame from '../PongGame';
import Paddle from './Paddle';

export default class Ball extends Entity {
  private ballLength: number;
  constructor(game: PongGame, ballLength: number) {
    super(game, ballLength, ballLength);
    this.ballLength = ballLength;

    this.setEntityController(new BallController(this));
  }

  override render(e: CanvasRenderingContext2D): void {
    super.render(e);
    e.fillStyle = 'white';
    e.strokeStyle = 'white';
    e.beginPath();
    e.arc(this.x + this.ballLength / 2, this.y + this.ballLength / 2, this.ballLength / 2, 0, 2 * Math.PI);
    e.stroke();
    e.fill();
  }

  public getBallLength() {
    return this.ballLength;
  }

  public getRadius() {
    return this.ballLength / 2;
  }

  public isCollidingWith(entity: Entity): boolean {
    // const ballOriginX = this.x + this.ballLength / 2;
    // const ballOriginY = this.y + this.ballLength / 2;
    // const entityOriginX = entity.x + entity.w / 2;
    // const enittyOriginY = entity.y + entity.h / 2;
    // const distBetweenOrigins = Math.sqrt((ballOriginY - enittyOriginY) ** 2 + (ballOriginX - entityOriginX) ** 2);
    // const isColliding = (x: number, y: number) =>
    //   Math.sqrt((ballOriginX - x) ** 2 + (ballOriginY - y) ** 2) < this.ballLength / 2;
    // return (
    //   isColliding(entity.x, entity.y) ||
    //   isColliding(entity.x, entity.y + entity.h) ||
    //   isColliding(entity.x + entity.w, entity.y) ||
    //   isColliding(entity.x + entity.w, entity.y + entity.h)
    // );

    const X1 = entity.x;
    const Y1 = entity.y;
    const X2 = entity.x + entity.w;
    const Y2 = entity.y + entity.h;

    const Xc = this.x + this.ballLength / 2;
    const Yc = this.y + this.ballLength / 2;
    const R = this.ballLength / 2;

    // Find the nearest point on the
    // rectangle to the center of
    // the circle
    const Xn = Math.max(X1, Math.min(Xc, X2));
    const Yn = Math.max(Y1, Math.min(Yc, Y2));

    // Find the distance between the
    // nearest point and the center
    // of the circle
    // Distance between 2 points,
    // (x1, y1) & (x2, y2) in
    // 2D Euclidean space is
    // ((x1-x2)**2 + (y1-y2)**2)**0.5
    const Dx = Xn - Xc;
    const Dy = Yn - Yc;

    return Dx * Dx + Dy * Dy <= R * R;
  }
}
