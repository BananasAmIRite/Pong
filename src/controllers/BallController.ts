import Ball from '../entities/Ball';
import Paddle from '../entities/Paddle';
import Entity from '../Entity';
import EntityController from '../EntityController';
import PaddleType from '../PaddleType';

export default class BallController extends EntityController<Ball> {
  private velocity: number;
  private direction: number;

  constructor(ball: Ball) {
    super(ball);
    this.velocity = 2;
    this.direction = Math.random() * Math.PI;
  }

  // y = mx+b
  // eY = m*eX+b
  // eY = s*eX+b
  // b = eY/(s*eX)

  // y = s*x+eY/(s*eX)

  // find x and y changes such that sqrt(cX^2+cY^2) = velocity
  // y = s*x+eY/(s*eX) // we have the current ball location
  // sqrt((cX)^2+(cY)^2)=velocity
  // sqrt(cX^2+(s*cX+eY/(s*eX))^2)=velocity
  // cX^2+(s*cX+eY/(s*eX))^2 = v^2 // let b = eY/(s*eX); itll be a calculated number anyways so we dont care
  // cX^2+s^2*cX^2+2s*cX*b+b^2=v^2
  // (s^2+1)cX^2+2s*cX*b+b^2=v^2
  // mathway this:
  // x^2+m^2x^2+2mxb+b^2=s^2
  control(): void {
    if (this.entity.x < 0) {
      // left side
      this.entity.getGame().addScore(PaddleType.RIGHT);
    } else if (this.entity.x + this.entity.w > this.entity.getGame().getWidth()) {
      // right side
      this.entity.getGame().addScore(PaddleType.LEFT);
    } else if (this.entity.y < 0 || this.entity.y + this.entity.h > this.entity.getGame().getHeight()) {
      // tops

      const yComp = Math.sin(this.direction);
      const xComp = Math.cos(this.direction);

      const newYComp = -yComp;
      const newXComp = xComp;

      this.direction = Math.atan2(newYComp, newXComp);
    }

    this.entity.setPosition(
      this.entity.x + Math.cos(this.direction) * this.velocity * this.entity.getGame().deltaT,
      this.entity.y + Math.sin(this.direction) * this.velocity * this.entity.getGame().deltaT
    );
  }

  onCollide(entity: Entity): void {
    if (!(entity instanceof Paddle)) return;
    // throw new Error('paddle collision !');

    // const yComp = Math.tan(this.direction);
    // const xComp = Math.sign(Math.tan(this.direction));
    const yComp = Math.sin(this.direction);
    const xComp = Math.cos(this.direction);

    const newYComp = yComp;
    const newXComp = -xComp;

    this.direction = Math.atan2(newYComp, newXComp);
  }
}
