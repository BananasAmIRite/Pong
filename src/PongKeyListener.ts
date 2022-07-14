import Paddle from './entities/Paddle';

export default class PongKeyListener {
  private keys: string[];

  private paddleLeft!: Paddle;
  private paddleRight!: Paddle;

  constructor(canvas: HTMLCanvasElement) {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (!this.keys.includes(e.key)) this.keys.push(e.key);
    });
    window.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (this.keys.includes(e.key)) this.keys.splice(this.keys.indexOf(e.key), 1);
    });
    this.keys = [];
  }

  public updatePaddles(paddleLeft: Paddle, paddleRight: Paddle) {
    this.paddleLeft = paddleLeft;
    this.paddleRight = paddleRight;
  }

  public onRender() {
    console.log(this.keys);
    this.keys.forEach((e) => {
      switch (e) {
        case 'w':
          this.paddleLeft.higher();
          break;
        case 's':
          this.paddleLeft.lower();
          break;
        case 'ArrowUp':
          this.paddleRight.higher();
          break;
        case 'ArrowDown':
          this.paddleRight.lower();
          break;
      }
    });
  }
}
