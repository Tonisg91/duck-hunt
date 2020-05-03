class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = [new Duck(this.canvas)];
    this.shots = [];
    this.timer = 10;
    this.points = 0;
  }
  drawAll() {
    const loop = () => {
      if (Math.random() > 0.99) {
        this.ducks.push(new Duck(this.canvas));
      }
      this.refresh();
      if (this.timer) {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }
  draw() {
    this.score();
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
          this.points += 25;
        }
      });
    });
  } //checkCollision

  score() {
    const x = this.canvas.width - this.canvas.width * 0.15;
    const y = this.canvas.height * 0.1;
    this.ctx.fillStyle = "black";

    if (this.timer) {
      this.ctx.font = "30px Courier New";
      this.ctx.fillText(`SCORE: ${this.points} `, x, y);
      this.ctx.fillText(`TIME ${this.timer}`, x, y + 30);
    }
  }

  timerOn() {
    if (this.timer > 0) {
      this.timer -= 1;
    }
  }
}
