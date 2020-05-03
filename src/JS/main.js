const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  let points;
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
  } // buildStartScreen

  const showControls = () => {
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
  `);
    setTimeout(function () {
      GameBoard();
    }, 5000);
  };

  const GameBoard = () => {
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

    //Create new Game
    const game = new Game(canvasElement);

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
      game.timerOn();
      if (game.timer === 0) {
        clearInterval(refresh);
        clearInterval(createDuck);
        points = game.points;
        endGame();
      }
    }, 1000);
  };

  const endGame = () => {
    buildDom(`
      <section id="endGame">
        <h1>Points: ${points}</h1>
      </section>
    `);
  };

  buildStartScreen();
}; // main closing

window.addEventListener("load", main);
