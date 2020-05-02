class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = new Duck(this.canvas);
    this.background = new Board(this.canvas);
    this.shot = [];
  }

  draw() {
    this.background.score();
    this.player.drawPlayer();
    this.ducks.drawDuck();
    this.ducks.duckMovement();
    this.shot.forEach((e) => {
      e.shotMove();
      e.drawShot();
    });
  } //draw()

  refresh() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.checkCollision();
    this.draw();
  } //refresh()

  startCrono() {
    if (!this.background.timer) {
      return "endgame";
    } else {
      this.background.timer -= 1;
    }
  } //startCrono()

  createDucks() {
    this.ducks.push(new Duck(this.canvas, 1));
  } //createDucks()

  createShot() {
    this.shot.push(new Shot(this.player.position, this.canvas));
  } //createShot()

  move(event) {
    switch (event) {
      case "a":
        if (this.player.position > 0) {
          this.player.position -= 30;
        }
        break;
      case "s":
        this.createShot();
        break;
      case "d":
        if (this.player.position < this.canvas.width - this.player.sizeX * 2) {
          this.player.position += 30;
        }
        break;
    }
  } //move()

  checkCollision() {
    for (let i = 0; i < this.shot.length; i++) {
      let bulletX = this.shot[i].x;
      let bulletY = this.shot[i].y;
      console.log(bulletX, "X");
      console.log(bulletY, "Y");
    }
  }
}
