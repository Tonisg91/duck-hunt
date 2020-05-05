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
          <audio src="/src/sounds/01 - Title Screen.ogg"  autoplay>
          </audio>
        </section>
    `
    ); //buildDom

    const startButton = document.querySelector("button");
    startButton.addEventListener("click", showControls);
  } // buildStartScreen

  const showControls = () => {
    buildDom(`
    <section class="go-center">
      <h1>CONTROLS</h1>
        <div>
          <h2 class="text-center">A</h2>
          <p>Move left</p>
        </div>
        <div>
          <h2 class="text-center">S</h2>
          <p>Shot</p>
        </div>
        <div>
          <h2 class="text-center">D</h2>
          <p>Move Right</p>
        </div>
        <audio src="/src/sounds/Duck Hunt Intro.ogg" autoplay></audio>
    </section>
  `);
    setTimeout(gameBoard, 6000);
  }; //showControls

  const gameBoard = () => {
    buildDom(`
              <section class="game-board">
                  <canvas></canvas>
              </section>
              <audio src="/src/sounds/99 - Counting Hits (SFX).ogg" id="shot"></audio>
              <audio src="/src/sounds/99 - Gunshot (SFX).ogg" id="gunshot"></audio>
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

    document.addEventListener("keydown", (event) => {
      game.move(event.key);
    });

    //Status refresh
    const refresh = setInterval(function () {
      game.refresh();
      game.createPoo();
    }, 15);
    const createDuck = setInterval(function () {
      game.createDucks();
    }, 2000);
    const animation = setInterval(function () {
      game.ducks.forEach((e) => e.animation());
    }, 150);

    //Timer coundtown
    const timer = setInterval(function () {
      game.timerOn();

      const clearAll = () => {
        clearInterval(createDuck);
        clearInterval(refresh);
        clearInterval(animation);
        points = game.points;
        clearInterval(timer);
      };

      if (!game.timer) {
        clearAll();
        endGame();
      }
      if (game.lives <= 0) {
        clearAll();
        endGame(1);
      }
    }, 1000);
  }; //GameBoard

  const endGame = (endType) => {
    const predefinedMessage = `
    <h1>SCORE: ${points}</h1>
    <br/>
    <button>RETRY</button>
    <br/>
    <button>HOME</button>
    `;

    if (endType) {
      buildDom(`
      <section id="endGame" class="go-center">
        <h1>GAME OVER</h1>
        ${predefinedMessage}
        <audio src="/src/sounds/08 - Game Over.ogg" autoplay></audio>
      </section>
    `);
    } else {
      buildDom(`
      <section id="endGame" class="go-center">
        ${predefinedMessage}
        <audio src="/src/sounds/05 - Round Clear.ogg" autoplay></audio>
      </section>
    `);
    }

    const retry = document.querySelectorAll("button");
    retry[0].addEventListener("click", gameBoard);
    retry[1].addEventListener("click", buildStartScreen);
  }; //endGame

  buildStartScreen();
}; // main closing

window.addEventListener("load", main);
