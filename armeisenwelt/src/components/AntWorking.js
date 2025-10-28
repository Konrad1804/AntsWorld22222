export default class AntWorking {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  movement() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
