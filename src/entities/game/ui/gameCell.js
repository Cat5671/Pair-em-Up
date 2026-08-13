import { createElement } from '@/shared/dom/createDomElem';

/**
 * @param {number} i
 * @param {number} j
 * @param {Number} value
 * @returns {HTMLElement}
 */
export function renderGameCell(i, j, value) {
  const cell = createElement('li', 'cell', `${value}`);
  cell.dataset.row = `${i}`;
  cell.dataset.col = `${j}`;
  return cell;
}
