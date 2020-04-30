const main = () => {
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  function buildStartScreen() {
    buildDom(
      `
                <section class="startScreen">
                    <h1>DUCK<br><span>HUNT</span></h1>
                    <button id="one-player">1 Player</button>
                    <button id="two-players">2 Players</button>
                </section>

            `
    ); //buildDom

    const startButtons = document.querySelectorAll("button");
    startButtons[0].addEventListener("click", function () {
      showControls(0);
    });
    startButtons[1].addEventListener("click", function () {
      showControls(1);
    });
  } // buildStartScreen

  const showControls = (players) => {
    if (!players) {
      //Controls for only Player
      buildDom(`
      <section class="showControls">
        <div>
          <h1>Player One</h1>
          <h2>A</h2>
          <p>Move left</p>
          <h2>S</h2>
          <p>Shoot trap</p>
          <h2>D</h2>
          <p>Move Right</p>
        </div>
      </section>
    `); //buildDom;
    } else {
      //Controls for Multiplayer
      buildDom(`
      <section class="showControls">
        <div>
          <h1>Player One</h1>
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
    const ctx = canvasElement.getContext("2d");

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);
    //CANVAS END
    const backGround = new Board(canvasElement);
    backGround.buildBackground(playersNumber);
    backGround.score(playersNumber);
    const game = new Game(canvasElement);
    //Function for draw all players
    const drawPlayers = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (!i) {
          ctx.fillStyle = "red";
          arr[i].drawPlayer(0);
        } else {
          ctx.fillStyle = "blue";
          arr[i].drawPlayer(-50);
        }
      }
    };
    //Create one or two players
    if (!playersNumber) {
      game.players.push(new Player(canvasElement));
    } else {
      game.players.push(new Player(canvasElement));
      game.players.push(new Player(canvasElement));
    }
    //Movement and shoot key listener
    document.addEventListener("keydown", (event) => {
      let key = event.key;
      switch (key) {
        case "a":
          game.players[0].moveLeft();
          break;
        case "d":
          game.players[0].moveRight();
          break;
        case "s":
          console.log("player 1 shoot");
          break;
        case "ArrowLeft":
          game.players[1].moveLeft();
          break;
        case "ArrowRight":
          game.players[1].moveRight();
          break;
        case "ArrowUp":
          console.log("player 2 shoot");
          break;
      } //switch
    }); // add event listener

    //Status refresh
    const refresh = setInterval(function () {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      backGround.buildBackground();
      drawPlayers(game.players);
    }, 30);
  };

  buildStartScreen();
}; // main closing

window.addEventListener("load", main);
