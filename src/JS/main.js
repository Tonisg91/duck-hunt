const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  function buildStartScreen() {
    buildDom(
      `
                <section class="startScreen">
                  <h1 id="duck">DUCK</h1>
                  <h1 id="hunt">HUNT</h1>
                  <button>START</button>
                </section>

            `
    ); //buildDom

    const startButtons = document.querySelectorAll("button");
    startButtons[0].addEventListener("click", function () {
      showControls(0);
    });
    // startButtons[1].addEventListener("click", function () {
    //   showControls(1);
    // });
  } // buildStartScreen

  const showControls = (players) => {
    if (!players) {
      //Controls for only Player
      buildDom(`
      <section class="showControls">
      <h1>CONTROLS</h1>
        <div>
          <h2 class="center">A</h2>
          <p>Move left</p>
        </div>
        <div>
          <h2 class="center">S</h2>
          <p>Shot</p>
        </div>
        <div>
          <h2 class="center">D</h2>
          <p>Move Right</p>
        </div>
      </section>
    `); //buildDom;
    } else {
      //Controls for Multiplayer
      buildDom(`
      <section class="showControls">
        <div>
          <h1>Controls</h1>
          <h2>A</h2>
          <p>Move left</p>
          <h2>S</h2>
          <p>Shoot trap</p>
          <h2>D</h2>
          <p>Move Right</p>
        </div>
        <div>
          <h1>Player two</h1>
          <i class="fas fa-arrow-circle-left"></i>
          <p>Move Left</p>
          <i class="fas fa-arrow-circle-up"></i>
          <p>Shoot trap </p>
          <i class="fas fa-arrow-circle-right"></i>
          <p>Move Right</p>
        </div>
      </section>
    `); //buildDom;
    }
    setTimeout(function () {
      GameBoard(players);
    }, 1000);
  };

  const GameBoard = (playersNumber) => {
    buildDom(`
             <section class="game-board">
                 <canvas></canvas>
             </section>
         `); //buildDom
    //CANVAS START
    const width = document.querySelector(".game-board").offsetWidth;
    const height = document.querySelector(".game-board").offsetHeight;

    const canvasElement = document.querySelector("canvas");

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);
    //CANVAS END

    const backGround = new Board(canvasElement);
    backGround.score();

    //Create new Game
    const game = new Game(canvasElement);
    setTimeout(game.draw, 500);

    //Movement and shot key listener
    document.addEventListener("keydown", (event) => {
      game.move(event.key);
    }); // add event listener

    //Status refresh
    const refresh = setInterval(function () {
      game.refresh();
    }, 10);
    const createDuck = setInterval(function () {
      game.createDucks();
    }, 3000);

    const animation = setInterval(function () {
      game.ducks.forEach((e) => e.animation());
    }, 150);

    //Timer coundtown
    const timer = setInterval(function () {
      game.startCrono();
      if (game.startCrono()) {
        clearInterval(timer);
        clearInterval(createDuck);
        clearInterval(refresh);
      }
    }, 1000);
  };

  buildStartScreen();
}; // main closing

window.addEventListener("load", main);
