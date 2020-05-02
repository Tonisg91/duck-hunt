class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = [new Duck(this.canvas)];
    this.background = new Board(this.canvas);
    this.shots = [];
  }

  draw() {
    this.background.score();
    this.player.drawPlayer();
    if (this.ducks) {
      this.ducks.forEach((e) => {
        e.drawDuck();
        e.duckMovement();
      });
    }
    this.shots.forEach((e) => {
      e.shotMove();
      e.drawShot();
    });
    this.eraseElements();
    this.checkCollision();
  } //draw()

  refresh() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  } //refresh()

  startCrono() {
    if (this.background.timer === 0) {
      return true;
    } else {
      this.background.timer -= 1;
    }
    return false;
  } //startCrono()

  createDucks() {
    this.ducks.push(new Duck(this.canvas));
  } //createDucks()

  createShot() {
    this.shots.push(new Shot(this.player.position, this.canvas));
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

  eraseElements() {
    this.shots.forEach((elem, idx) => {
      if (elem.y <= -elem.sizeY) {
        this.shots.splice(idx, 1);
      }
    });
    this.ducks.forEach((elem, idx) => {
      if (elem.y <= -500) {
        this.ducks.splice(idx, 1);
      }
    });
  } //eraseElements

  checkCollision() {
    this.shots.forEach((bullet, bIdx) => {
      let bulletX = parseInt(bullet.x);
      let bulletY = parseInt(bullet.y);

      this.ducks.forEach((duck, dIdx) => {
        let duckX = parseInt(duck.x);
        let duckY = parseInt(duck.y);
        let duckEndX = duckX + 60;
        let duckEndY = duckY + 90;

        if (
          bulletX > duckX &&
          bulletX < duckEndX &&
          bulletY > duckY &&
          bulletY < duckEndY
        ) {
          this.shots.splice(bIdx, 1);
          this.ducks.splice(dIdx, 1);
          this.background.points += 25;
        }
      });
    });
  } //checkCollision
}
