class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 30;
    this.sizeY = 50;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - this.canvas.height * 0.15;
    this.position = this.canvas.width / 2;
  }

  drawPlayer() {
    this.ctx.fillRect(
      this.position,
      this.canvas.height - this.canvas.height * 0.15,
      this.sizeX,
      this.sizeY
    );
  }
  moveLeft() {
    if (this.position > 0) {
      this.position -= 20;
    }
  }
  moveRight() {
    if (this.position < this.canvas.width - this.sizeX) {
      this.position += 20;
    }
  }
  shot() {}
}
