class Duck {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 70;
    this.sizeY = 30;
    this.startPositionX = this.canvas.width - this.sizeX;
  }
  drawDuck() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.startPositionX,
      this.canvas.height - this.canvas.height * 0.2,
      this.sizeX,
      this.sizeY
    );
  }
}
