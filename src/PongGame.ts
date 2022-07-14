import Ball from './entities/Ball';
import Paddle from './entities/Paddle';
import Entity from './Entity';
import PaddleType from './PaddleType';
import PongKeyListener from './PongKeyListener';

export default class PongGame {
  private width: number;
  private height: number;

  private leftScore!: number;
  private rightScore!: number;

  private canvas: HTMLCanvasElement;
  private keyListener!: PongKeyListener;

  private entities: Entity[];

  private lastRender: number;

  public deltaT: number;
  constructor(elem: HTMLCanvasElement) {
    this.entities = [];

    this.width = elem.width;
    this.height = elem.height;
    this.canvas = elem;
    this.keyListener = new PongKeyListener(elem);
    this.lastRender = Date.now();
    this.deltaT = 0;

    this.restart();
  }

  async start() {
    requestAnimationFrame(() => this.gameLoop());
  }

  public addScore(type: PaddleType) {
    if (type === PaddleType.LEFT) this.leftScore += 1;
    else this.rightScore += 1;
    this.reset();
  }

  private restart() {
    this.reset();
    this.leftScore = 0;
    this.rightScore = 0;
  }

  public reset() {
    const paddleLeft = new Paddle(this, 100, PaddleType.LEFT);
    paddleLeft.setPosition(10, this.height / 2 - paddleLeft.getPaddleHeight() / 2);
    const paddleRight = new Paddle(this, 100, PaddleType.RIGHT);
    paddleRight.setPosition(
      this.width - (10 + paddleRight.getPaddleWidth()),
      this.height / 2 - paddleRight.getPaddleHeight() / 2
    );
    this.keyListener.updatePaddles(paddleLeft, paddleRight);

    const ball = new Ball(this, 10);
    // ball.setPosition(0, 0);
    ball.setPosition(this.width / 2 - ball.getRadius(), this.height / 2 - ball.getRadius());
    // ball.setPosition(this.width - 100, this.height / 2 - 50);

    this.entities = [];
    this.entities.push(ball, paddleLeft, paddleRight);
  }

  private gameLoop() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('No context');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);

    this.deltaT = (Date.now() - this.lastRender) / 5;
    this.lastRender = Date.now();

    console.log('render loop start');

    for (let entity of this.entities) {
      entity.render(ctx);
    }

    this.keyListener.onRender();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  public getEntities() {
    return this.entities;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }
}
