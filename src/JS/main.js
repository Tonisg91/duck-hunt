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
    startButtons[0].addEventListener("click", buildGameBoard);
    startButtons[1].addEventListener("click", buildGameBoard);
  } // buildStartScreen

  const buildGameBoard = () => {
    buildDom(`
             <section class="game-board">
                 <canvas></canvas>
             </section>
         `); //buildDom

    const width = document.querySelector(".game-board").offsetWidth;
    const height = document.querySelector(".game-board").offsetHeight;

    const canvasElement = document.querySelector("canvas");

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);

    const backGround = new Board(canvasElement);
    backGround.buildBackground();
  };

  buildStartScreen();
}; // main closing

window.addEventListener("load", main);
