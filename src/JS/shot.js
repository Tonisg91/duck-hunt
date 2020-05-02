class Shot {
  constructor(positionX, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 10;
    this.sizeY = 50;
    this.x = positionX;
    this.y = this.canvas.height - this.canvas.height * 0.2;
  }

  drawShot() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    this.ctx.stroke();
  }
  shotMove() {
    this.y -= 4;
  }
}
