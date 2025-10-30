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
  setSpeed(newSpeedX, newSpeedY) {
    this.speedX = newSpeedX;
    this.speedY = newSpeedY;
  }
  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }
  hasStopped() {
    return this.speedX === 0 && this.speedY === 0;
  }
}
