import { createElement } from '@/shared/dom/createDomElem.js';
import './gameField.scss';

/**
 * @param {Array<Array<Number>>} field
 */
export function renderGameBoard(field) {
  const gameBoard = createElement('ul', 'game-board');
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      const cell = createElement('li', 'cell', `${field[i][j]}`);
      cell.dataset.row = `${i}`;
      cell.dataset.col = `${j}`;
      gameBoard.append(cell);
    }
  }
  return gameBoard;
}
