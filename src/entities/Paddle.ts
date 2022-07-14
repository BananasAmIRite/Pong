import PaddleController from '../controllers/PaddleController';
import Entity from '../Entity';
import PaddleType from '../PaddleType';
import PongGame from '../PongGame';

export default class Paddle extends Entity {
  private paddleWidth: number;
  private paddleHeight: number;
  private paddleSpeed: number;
  private type: PaddleType;
  constructor(game: PongGame, h: number, type: PaddleType, speed: number = 2.5) {
    super(game, 10, h);
    this.paddleWidth = 10;
    this.paddleHeight = h;
    this.paddleSpeed = speed;
    this.type = type;

    this.setEntityController(new PaddleController(this));
  }
  override render(e: CanvasRenderingContext2D): void {
    super.render(e);
    e.fillStyle = 'white';
    e.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
  }

  public higher() {
    this.setPositionWithBounds(this.x, this.y - this.paddleSpeed * this.getGame().deltaT);
  }

  public lower() {
    this.setPositionWithBounds(this.x, this.y + this.paddleSpeed * this.getGame().deltaT);
  }

  public getPaddleHeight(): number {
    return this.paddleHeight;
  }

  public getPaddleWidth(): number {
    return this.paddleWidth;
  }

  public getPaddleType(): PaddleType {
    return this.type;
  }
}
