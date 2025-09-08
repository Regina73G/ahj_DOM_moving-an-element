export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  drawField() {
    this.checkBinding();

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    
    this.boardEl = document.createElement('div');
    this.boardEl.classList.add('board');
    
    boardContainer.appendChild(this.boardEl);
    this.container.appendChild(boardContainer);

    for (let i = 0; i < this.boardSize ** 2; i+= 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  init() {
    this.drawField();
  }
}