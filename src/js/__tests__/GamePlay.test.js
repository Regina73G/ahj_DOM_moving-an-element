/**
 * @jest-environment jsdom
 */

import GamePlay from "../GamePlay";

let gamePlay;
let container;

beforeEach(() => {
  gamePlay = new GamePlay();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('bindToDOM выбрасывает ошибку при неправильном контейнере', () => {
  expect(() => gamePlay.bindToDOM(null)).toThrow('container is not HTMLElement');
});

test('checkBinding должна выдать ошибку, если контейнер имеет значение null', () => {
  expect(() => gamePlay.checkBinding()).toThrow('GamePlay not bind to DOM');
});

test('drawField создаёт поле и ячейки', () => {
  gamePlay.bindToDOM(container);
  gamePlay.drawField();

  const board = container.querySelector('.board');
  const cells = container.querySelectorAll('.cell');

  expect(board).not.toBeNull();
  expect(cells.length).toBe(16);
  expect(gamePlay.cells.length).toBe(16);
});

test('redrawPosition добавляет гоблина в указанную клетку', () => {
  gamePlay.bindToDOM(container);
  gamePlay.drawField();

  const index = 5;
  gamePlay.redrawPosition(index);

  gamePlay.cells.forEach((cell, i) => {
    const goblin = cell.querySelector('.goblin');
    if (i === index) {
      expect(goblin).not.toBeNull();
    } else {
      expect(goblin).toBeNull();
    }
  });
});

test('не изменяет клетки при некорректном индексе', () => {
  const initialHTML = gamePlay.cells.map(cell => cell.innerHTML);

  gamePlay.redrawPosition(-1);
  gamePlay.redrawPosition(1000);

  gamePlay.cells.forEach((cell, i) => {
    expect(cell.innerHTML).toBe(initialHTML[i]);
  });
});