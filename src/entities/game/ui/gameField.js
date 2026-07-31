import { createElement } from '../../../shared/dom/createDomElem.js';

/**
 * @param {Array<Array<Number>>} field
 */
export function renderGameBoard(field) {
  const gameBoard = createElement('div', 'game-board');
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      const cell = createElement('div', 'cell', `${field[i][j]}`);
      cell.dataset.row = `${i}`;
      cell.dataset.col = `${j}`;
      gameBoard.append(cell);
    }
  }
  return gameBoard;
}
