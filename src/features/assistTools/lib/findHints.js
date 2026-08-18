import { EMPTY_CELL } from '@/entities/game';
import { isValidPair } from '@/features/matchCells';

/**
 * @param {number} row
 * @param {number} col
 * @param {Array<Array<Number>>} field
 * @returns {null | number}
 */
function findHorizontalCellNumber(row, col, field) {
  let h = col + 1;
  for (let i = row; i < field.length; i += 1) {
    for (let j = h; j < field[i].length; j += 1) {
      if (field[i][j] !== EMPTY_CELL) return field[i][j];
    }
    h = 0;
  }
  return null;
}

/**
 * @param {number} row
 * @param {number} col
 * @param {Array<Array<Number>>} field
 * @returns {null | number}
 */
function findVerticalCellNumber(row, col, field) {
  for (let i = row + 1; i < field.length; i += 1) {
    if (field[i][col] !== EMPTY_CELL) return field[i][col];
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

      const value = gameField[i][j];
      const horizontalCellNumber = findHorizontalCellNumber(i, j, gameField);
      const verticalCellNumber = findVerticalCellNumber(i, j, gameField);

      if (verticalCellNumber && isValidPair(value, verticalCellNumber)) {
        hints += 1;
      }
      if (horizontalCellNumber && isValidPair(value, horizontalCellNumber)) {
        hints += 1;
      }
    }
  }
  return hints;
}
