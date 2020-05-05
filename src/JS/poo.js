class Poo {
  constructor(positionX, positionY, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 10;
    this.sizeY = 30;
    this.x = positionX;
    this.y = positionY;
  }

  drawPoo() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    this.ctx.stroke();
  }
  pooMove() {
    this.y += 4;
  }
}
