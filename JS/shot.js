class Shot {
  constructor(positionX, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeX = 30;
    this.sizeY = 30;
    this.x = positionX;
    this.y = this.canvas.height - this.canvas.height * 0.2;
  }

  draw() {
    const ctx = this.ctx;
    const x = this.x;
    const y = this.y;
    const sizeX = this.sizeX;
    const sizeY = this.sizeY;
    const bulletImg = new Image();
    bulletImg.src = "/views/images/bullet.svg";
    bulletImg.onload = function () {
      ctx.drawImage(bulletImg, x, y, sizeX, sizeY);
    };
  }
  move() {
    this.y -= 8;
  }
}
