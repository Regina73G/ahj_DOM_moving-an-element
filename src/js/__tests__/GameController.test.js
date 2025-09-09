/**
 * @jest-environment jsdom
 */

import GamePlay from "../GamePlay";
import GameController from "../GameController";

jest.useFakeTimers(); 

let gamePlay;
let controller;

beforeEach(() => {
  gamePlay = new GamePlay();
  const container = document.createElement('div');
  document.body.appendChild(container);
  gamePlay.bindToDOM(container);
  gamePlay.drawField();

  controller = new GameController(gamePlay);
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('init вызывает drawField и redrawPosition', () => {
  const redrawSpy = jest.spyOn(gamePlay, 'redrawPosition');
  
  controller.init();

  expect(redrawSpy).toHaveBeenCalledTimes(1);
  expect(redrawSpy).toHaveBeenCalledWith(controller.position);
});

test('start запускает интервал и перемещает гоблина', () => {
  const redrawSpy = jest.spyOn(gamePlay, 'redrawPosition');

  controller.start();

  // Симулируем проход одного интервала
  jest.advanceTimersByTime(700);

  expect(redrawSpy).toHaveBeenCalled();
  expect(controller.position).not.toBeNull();
});

test('stop очищает интервал', () => {
  controller.start();
  expect(controller.intervalId).not.toBeNull();

  controller.stop();
  expect(controller.intervalId).toBeNull();
});

test('generatePosition возвращает валидный индекс, не меньше 0 и не больше чем клеток на поле', () => {
  const boardSize = gamePlay.boardSize;
  const pos = controller.generatePosition(boardSize);

  expect(pos).toBeGreaterThanOrEqual(0);
  expect(pos).toBeLessThan(boardSize ** 2);
});