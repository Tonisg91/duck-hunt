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
    const ctx = this.ctx;
    const x = this.x;
    const y = this.y;
    const bulletImg = new Image();
    bulletImg.src = "/src/views/images/weapons.svg";
    bulletImg.onload = function () {
      ctx.drawImage(bulletImg, x, y, 30, 30);
    };
  }
  shotMove() {
    this.y -= 8;
  }
}
