class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player = new Player(this.canvas);
    this.ducks = new Duck(this.canvas);
    this.isGameOver = false;
    this.background = new Board(this.canvas);
  }
  draw() {
    this.background.buildBackground();
    this.player.drawPlayer();
    this.ducks.drawDuck();
  }
  refresh() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }
  startCrono() {
    this.background.timer -= 1;
    if (this.background.timer === 0) {
      console.log("endgame function");
    }
  }
  createDucks() {
    this.ducks.push(new Duck(this.canvas));
  }
}
