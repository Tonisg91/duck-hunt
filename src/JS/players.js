class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 30;
    this.sizeY = 50;
    this.y = this.canvas.height - this.canvas.height * 0.15;
    this.position = this.canvas.width / 2;
  }

  draw() {
    const ctx = this.ctx;
    const xPosition = this.position;
    const yPosition = this.y;
    const playerImg = new Image();
    playerImg.src = "/src/views/images/player.gif";
    playerImg.onload = function () {
      ctx.drawImage(playerImg, xPosition, yPosition, 90, 135);
    };
  }
}
