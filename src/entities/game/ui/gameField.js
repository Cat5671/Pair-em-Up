import { createElement } from '@/shared/dom/createDomElem';
import { renderGameCell } from './gameCell.js';
import './gameField.scss';

/**
 * @param {Array<Array<Number>>} field
 * @param {function(Number, Number, Number): void} onCellCick
 * @returns { HTMLElement }
 */
export function renderGameBoard(field, onCellCick) {
  const gameBoard = createElement('ul', 'game-board');
  const fragment = new DocumentFragment();
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      const cell = renderGameCell(i, j, field[i][j]);
      fragment.append(cell);
    }
  }
  gameBoard.append(fragment);

  if (!onCellCick) return gameBoard;

  gameBoard.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || !(target instanceof HTMLElement)) return;
    const cell = target.closest('.cell');
    if (!cell || !(cell instanceof HTMLLIElement)) return;

    const row = cell.dataset.row;
    const col = cell.dataset.col;
    if (!row || !col) return;

    const r = parseInt(row);
    const c = parseInt(col);
    onCellCick(r, c, field[r][c]);
  });
  return gameBoard;
}
