class Explosion extends Duck {
  constructor(canvas, x, y) {
    super(canvas);
    this.imgSrc = "./views/images/explosion.svg";
    this.x = x;
    this.y = y;
    this.sizeX = 90;
    this.sizeY = 90;
  }
}
