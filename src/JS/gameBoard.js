class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width; //1200px
    this.height = this.canvas.height; // 700px
    this.timer = 120;
    this.points = 0;
  }

  score() {
    const x = this.width - this.width * 0.15;
    const y = this.height * 0.1;
    this.ctx.fillStyle = "black";

    if (this.timer) {
      this.ctx.font = "30px Press Start 2P";
      this.ctx.fillText(`SCORE: ${this.points} `, x, y);
      this.ctx.fillText(`TIME ${this.timer}`, x, y + 30);
    }
  }
}
