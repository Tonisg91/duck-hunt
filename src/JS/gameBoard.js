class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width; //1200px
    this.height = this.canvas.height; // 700px
    this.timer = 120;
  }

  buildBackground(players) {
    const canvas = this.canvas;
    const ctx = this.ctx;
    let ground = new Image();
    ground.src = "https://i.ibb.co/tP412GY/pixel-background-9121.png";
    ground.onload = function () {
      ctx.drawImage(ground, 0, 0);
    };

    //Blue zone (Sky) the rest 85%
    // this.ctx.fillStyle = "lightblue";
    // this.ctx.fillRect(
    //   0, //X start
    //   0, //Y start
    //   this.width, //X finish
    //   this.canvas.height //Y finish
    // );

    this.score(players);
  }

  score(players) {
    const x = this.width - this.width * 0.15;
    const y = this.height * 0.1;
    this.ctx.fillStyle = "black";

    if (!players) {
      this.ctx.font = "30px Verdana";
      this.ctx.fillText("SCORE: 0 ", x, y);
      this.ctx.fillText(`TIME ${this.timer}`, x, y + 30);
    } else {
      this.ctx.font = "30px Verdana";
      this.ctx.fillText("Player 1: 0", x, y);
      this.ctx.fillText("Player 2: 0", x, y + 30);
    }
  }
}
