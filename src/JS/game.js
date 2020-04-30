class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.players = [];
    this.ducks = [];
    this.isGameOver = false;
  }
  start() {}
}
