/**
 * @jest-environment jsdom
 */

import GamePlay from "../GamePlay";

let game;
let container;

beforeEach(() => {
  game = new GamePlay();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('bindToDOM выбрасывает ошибку при неправильном контейнере', () => {
  expect(() => game.bindToDOM(null)).toThrow('container is not HTMLElement');
});

test('checkBinding должна выдать ошибку, если контейнер имеет значение null', () => {
  expect(() => game.checkBinding()).toThrow('GamePlay not bind to DOM');
});

test('drawField создаёт поле и ячейки', () => {
  game.bindToDOM(container);
  game.drawField();

  const board = container.querySelector('.board');
  const cells = container.querySelectorAll('.cell');

  expect(board).not.toBeNull();
  expect(cells.length).toBe(16);
  expect(game.cells.length).toBe(16);
});