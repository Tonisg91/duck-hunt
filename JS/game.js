class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = [new Duck(this.canvas)];
    this.shots = [];
    this.poo = [];
    this.timer = 60;
    this.points = 0;
    this.lives = 3;
  }

  buildBoard() {
    this.score();
    this.eraseElements();
    this.drawElements();
    this.checkCollision();
  } //draw()

  drawElements() {
    //Iteramos sobre el array y llamamos a los metodos draw y move
    //draw y move son iguales en todas las clases
    const drawAll = (array) => {
      if (array) {
        array.forEach((e) => {
          e.draw();
          e.move();
        });
      }
    };
    this.player.draw();
    drawAll(this.poo);
    drawAll(this.ducks);
    drawAll(this.shots);
  } //drawElements

  eraseElements() {
    //Igual que drawElements pero eliminando el primer objeto de
    // cada array en caso de que salgan de la pantalla
    const erase = (array) => {
      array.forEach((elem) => {
        if (elem.y <= -elem.sizeY || elem.y >= this.canvas.height) {
          array.shift();
        }
      });
    };
    erase(this.ducks);
    erase(this.shots);
    erase(this.poo);
  } //eraseElements

  refresh() {
    //Limpiamos y pintamos de nuevo
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.buildBoard();
  } //refresh()

  createDucks() {
    this.ducks.push(new Duck(this.canvas));
  } //createDucks()

  createShot() {
    this.shots.push(new Shot(this.player.position, this.canvas));
    document.getElementById("gunshot").play();
  } //createShot()

  createPoo() {
    //La funcion solo sera llamada en caso que la condicion se cumpla
    // para no saturar con demasiados objetos
    if (this.ducks) {
      let randomDuck = this.ducks[
        Math.floor(Math.random() * this.ducks.length)
      ];
      if (Math.random() > 0.99) {
        this.poo.push(new Poo(randomDuck.x, randomDuck.y, this.canvas));
      }
    }
  } //createPoo

  move(event) {
    //Movemos al personaje y/o creamos un disparo
    //El personaje se detiene en caso de llegar al limite de la pantalla
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
  } //move

  checkCollision() {
    //shots and ducks
    this.shots.forEach((bullet, bIdx) => {
      let bulletX = parseInt(bullet.x);
      let bulletY = parseInt(bullet.y);

      this.ducks.forEach((duck, dIdx) => {
        let duckX = parseInt(duck.x);
        let duckY = parseInt(duck.y);
        let duckEndX = duckX + duck.sizeX;
        let duckEndY = duckY + duck.sizeY;
        //Evalua si el disparo esta entre las coordenadas que ocupa el pato
        //Si es asi, elimina el pato y la bala correspondientes
        if (
          bulletX > duckX &&
          bulletX < duckEndX &&
          bulletY > duckY &&
          bulletY < duckEndY
        ) {
          this.shots.splice(bIdx, 1);
          document.getElementById("shot").play();
          this.points += 25;
          this.ducks.splice(dIdx, 1);
        }
      });
    });
    // poo and player
    this.poo.forEach((poo, pIdx) => {
      let pooX = parseInt(poo.x);
      let pooY = parseInt(poo.y + poo.sizeY);

      let playerX = parseInt(this.player.position);
      let playerEndX = playerX + this.player.sizeX;
      let playerY = parseInt(this.player.y);
      //Igual que el anterior pero elimina poo correspondiente y resta una vida
      if (pooX > playerX - 5 && pooX < playerEndX && pooY >= playerY) {
        this.poo.splice(pIdx, 1);
        this.lives -= 1;
      }
    });
  } //checkCollision

  score() {
    //Muestra los datos de la partida en tiempo real
    const x = this.canvas.width - this.canvas.width * 0.15;
    const y = this.canvas.height * 0.1;
    this.ctx.fillStyle = "black";

    if (this.timer) {
      this.ctx.font = "30px Courier New";
      this.ctx.fillText(`SCORE: ${this.points} `, x, y);
      this.ctx.fillText(`TIME: ${this.timer}`, x, y + 30);
      this.ctx.fillText(`LIVES: ${this.lives}`, x, y + 60);
    }
  } //score

  timerOn() {
    if (this.timer > 0) {
      this.timer -= 1;
    }
  } //score
}
