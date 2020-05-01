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
    const canvas = this.canvas;
    const ctx = this.ctx;
    const position = this.position;
    const playerImg = new Image();
    playerImg.src = "https://i.ibb.co/zbq4PR7/idle.gif";
    playerImg.onload = function () {
      ctx.drawImage(
        playerImg,
        position,
        canvas.height - canvas.height * 0.15,
        90,
        135
      );
    };
  } //drawPlayer Method

  move(event) {
    switch (event) {
      case "a":
        if (this.position > 0) {
          this.position -= 30;
        }
        break;
      case "s":
        this.shot();
        break;
      case "d":
        if (this.position < this.canvas.width - this.sizeX * 2) {
          this.position += 30;
        }
        break;
    }
  } //move method

  shot() {} //shot method
}
