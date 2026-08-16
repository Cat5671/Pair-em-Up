import { createElement } from '@/shared/dom/createDomElem';
import { EMPTY_CELL } from '../config/constants.js';

/**
 * @param {number} i
 * @param {number} j
 * @param {Number} value
 * @returns {HTMLElement}
 */
export function renderGameCell(i, j, value) {
  const text = value === EMPTY_CELL ? '' : `${value}`;
  const cell = createElement('li', 'cell', text);
  cell.dataset.row = `${i}`;
  cell.dataset.col = `${j}`;

  if (value === EMPTY_CELL) cell.classList.add('cell--crossed');
  return cell;
}
