class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 90;
    this.sizeY = 135;
    this.y = this.canvas.height - this.canvas.height * 0.15;
    this.position = this.canvas.width / 2;
  }

  draw() {
    const ctx = this.ctx;
    const xPosition = this.position;
    const yPosition = this.y;
    const sizeX = this.sizeX;
    const sizeY = this.sizeY;
    const playerImg = new Image();
    playerImg.src = "./views/images/player.png";
    playerImg.onload = function () {
      ctx.drawImage(playerImg, xPosition, yPosition, sizeX, sizeY);
    };
  }
}
