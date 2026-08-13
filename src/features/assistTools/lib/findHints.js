import { EMPTY_CELL } from '@/entities/game';
import { isValidPair } from '@/features/matchCells';

/**
 * @param {number} row
 * @param {number} col
 * @param {Array<Array<Number>>} field
 * @returns {null | {row: number, col: number}}
 */
function findFirstHorizontal(row, col, field) {
  let h = col + 1;
  for (let i = row; i < field.length; i += 1) {
    for (let j = h; j < field[i].length; j += 1) {
      if (field[i][j] !== EMPTY_CELL) return { row: i, col: j };
    }
    h = 0;
  }
  return null;
}

/**
 * @param {number} row
 * @param {number} col
 * @param {Array<Array<Number>>} field
 * @returns {null | {row: number, col: number}}
 */
function findFirstVertical(row, col, field) {
  for (let i = row + 1; i < field.length; i += 1) {
    if (field[i][col] !== EMPTY_CELL) return { row: i, col };
  }
  return null;
}

/**
 * @param {Array<Array<Number>>} gameField
 * @returns {Number}
 */
export function findHints(gameField) {
  let hints = 0;
  for (let i = 0; i < gameField.length; i += 1) {
    for (let j = 0; j < gameField[i].length; j += 1) {
      if (gameField[i][j] === EMPTY_CELL) continue;

      const horizontalAdjacentElem = findFirstHorizontal(i, j, gameField);
      const verticalAdjacentElem = findFirstVertical(i, j, gameField);

      if (verticalAdjacentElem) {
        const { row, col } = verticalAdjacentElem;
        if (isValidPair(gameField[i][j], gameField[row][col])) {
          hints += 1;
        }
      }
      if (horizontalAdjacentElem) {
        const { row, col } = horizontalAdjacentElem;
        if (isValidPair(gameField[i][j], gameField[row][col])) {
          hints += 1;
        }
      }
    }
  }
  return hints;
}
