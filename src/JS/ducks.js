class Duck {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 70;
    this.sizeY = 30;
    this.startPositionX = [this.canvas.width - this.sizeX, 0];
  }
  buildDuck() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      this.canvas.width,
      this.canvas.height - this.canvas.height * 0.2,
      this.sizeX,
      this.sizeY
    );
  }
}
