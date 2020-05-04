class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = [new Duck(this.canvas)];
    this.shots = [];
    this.poo = [];
    this.timer = 100;
    this.points = 0;
    this.lives = 3;
  }
  draw() {
    this.score();
    this.player.drawPlayer();
    if (this.poo) {
      this.poo.forEach((e) => {
        e.drawPoo();
        e.pooMove();
      });
    }
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
    document.getElementById("gunshot").play();
  } //createShot()

  createPoo() {
    let randomDuck = this.ducks[Math.floor(Math.random() * this.ducks.length)];
    if (Math.random() > 0.99) {
      this.poo.push(new Poo(randomDuck.x, randomDuck.y, this.canvas));
    }
  }
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
      if (elem.y <= -200) {
        this.ducks.splice(idx, 1);
      }
    });
    this.poo.forEach((elem, idx) => {
      if (elem.y > this.canvas.height + 50) {
        this.poo.splice(idx, 1);
      }
    });
  } //eraseElements

  checkCollision() {
    //shots and ducks
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
          document.getElementById("shot").play();
          this.points += 25;
        }
      });
    });
    // poo and player
    this.poo.forEach((poo, pIdx) => {
      let pooX = parseInt(poo.x);
      let pooY = parseInt(poo.y);
      let pooSizeY = pooY + poo.sizeY;
      let pooSizeX = pooX + poo.sizeX;

      let playerX = parseInt(this.player.position);
      let playerEndX = playerX + this.player.sizeX;
      let playerY = parseInt(this.player.y);

      if (pooX > playerX - 5 && pooSizeX < playerEndX && pooSizeY >= playerY) {
        this.poo.splice(pIdx, 1);
        this.lives -= 1;
      }
    });
  } //checkCollision

  score() {
    const x = this.canvas.width - this.canvas.width * 0.15;
    const y = this.canvas.height * 0.1;
    this.ctx.fillStyle = "black";

    if (this.timer) {
      this.ctx.font = "30px Courier New";
      this.ctx.fillText(`SCORE: ${this.points} `, x, y);
      this.ctx.fillText(`TIME: ${this.timer}`, x, y + 30);
      this.ctx.fillText(`LIVES: ${this.lives}`, x, y + 60);
    }
  }

  timerOn() {
    if (this.timer > 0) {
      this.timer -= 1;
    }
  }
}
