class Duck {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.randomSide = [this.canvas.width - 170, 100];
    this.x = this.randomSide[Math.floor(Math.random() * 2)];
    this.y = this.canvas.height - this.canvas.height * 0.3;
    this.sizeX = 60;
    this.sizeY = 90;
    this.xMovement = 8;
    this.yMovement = 1;
    this.imgArr = [
      "/src/views/images/duckhunt_1.png",
      "/src/views/images/duckhunt_2.png",
      "/src/views/images/duckhunt_3.png",
      "/src/views/images/duckhunt_4.png",
      "/src/views/images/explosion.svg",
    ];
    this.imgSrc = this.imgArr[3];
  }
  draw() {
    const ctx = this.ctx;
    const duckImg = new Image();
    let startPositionX = this.x;
    let startPositionY = this.y;
    let sizeX = this.sizeX;
    let sizeY = this.sizeY;
    duckImg.src = this.imgSrc;
    duckImg.onload = function () {
      ctx.drawImage(duckImg, startPositionX, startPositionY, sizeX, sizeY);
    };
  }

  move() {
    //Determinamos la direccion del movimiento segun la posicion
    //Cambiamos la imagen acorde a la direccion
    if (this.x >= 50) {
      this.x -= this.xMovement;
      this.y -= this.yMovement;
    }
    if (this.x < 100) {
      this.imgSrc = this.imgArr[1];
      this.xMovement *= -1;
    }
    if (this.x > this.canvas.width - 100) {
      this.imgSrc = this.imgArr[0];
      this.xMovement *= -1;
    }
  }

  animation() {
    //Intercambiamos la imagen segun la anterior para crear la animacion
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
