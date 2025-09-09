export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.position = null;
    this.intervalId = null;
  }

  init() {
    this.gamePlay.drawField();

    const boardSize = this.gamePlay.boardSize;
    this.position = this.generatePosition(boardSize);
    console.log(this.position);
    this.gamePlay.redrawPosition(this.position);

    this.start();
  }

  start() {
    const boardSize = this.gamePlay.boardSize;
    this.stop();

    this.intervalId = setInterval(() => {
      let newPos;
      do {
        newPos = this.generatePosition(boardSize);
      } while (newPos === this.position);

      this.position = newPos;
      this.gamePlay.redrawPosition(this.position);
    }, 700);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  generatePosition(boardSize) {
    return Math.floor(Math.random() * (boardSize ** 2));
  }
}