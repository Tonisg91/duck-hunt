class Duck {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.startPositionX = this.canvas.width - 170;
    this.startPositionY = this.canvas.height - this.canvas.height * 0.3;
    this.xMovement = 6;
    this.yMovement = 1;
    this.duckImg = new Image();
    this.imgArr = [
      "https://i.ibb.co/dJWhHjT/duckhunt-1.png",
      "https://i.ibb.co/RDNb3RL/duckhunt-2.png",
      "https://i.ibb.co/pd326wX/duckhunt-3.png",
      "https://i.ibb.co/XsG1F9B/duckhunt-4.png",
    ];
    this.imgSrc = this.imgArr[3];
  }
  drawDuck() {
    const ctx = this.ctx;
    const duckImg = new Image();
    let startPositionX = this.startPositionX;
    let startPositionY = this.startPositionY;
    duckImg.src = this.imgSrc;
    duckImg.onload = function () {
      ctx.drawImage(duckImg, startPositionX, startPositionY, 60, 90);
    };
  }

  duckMovement() {
    if (this.startPositionX >= 50) {
      this.startPositionX -= this.xMovement;
      this.startPositionY -= this.yMovement;
    }
    if (this.startPositionX < 100) {
      this.imgSrc = this.imgArr[1];
      this.xMovement *= -1;
    }
    if (this.startPositionX > this.canvas.width - 100) {
      this.imgSrc = this.imgArr[0];
      this.xMovement *= -1;
    }
  }
  animation() {
    switch (this.imgSrc) {
      case this.imgArr[3]:
        this.imgSrc = this.imgArr[0];
        break;
      case this.imgArr[0]:
        this.imgSrc = this.imgArr[3];
        break;
      case this.imgArr[2]:
        this.imgSrc = this.imgArr[1];
        break;
      case this.imgArr[1]:
        this.imgSrc = this.imgArr[2];
        break;
    }
  }
}
