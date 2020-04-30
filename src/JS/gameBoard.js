class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width; //1200px
    this.height = this.canvas.height; // 700px
  }
  buildBackground() {
    //Green zone occupies the 15% of canvas
    this.ctx.fillStyle = "lightgreen";
    this.ctx.fillRect(0, this.height, this.width, -this.height * 0.15);
    //Blue zone (Sky) the rest 85%
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(
      0, //X start
      this.height - this.height * 0.15, //Y start
      this.width, //X finish
      -this.height * 0.85 //Y finish
    );
  }
}
