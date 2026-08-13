import { EMPTY_CELL } from '../config/constants.js';

/**
 * @param {Array<Array<Number>>} field
 * @returns {Array<Number>}
 */

export function getNonZeroNumbers(field) {
  const nonZeroNumbers = [];
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (field[i][j] !== EMPTY_CELL) nonZeroNumbers.push(field[i][j]);
    }
  }
  return nonZeroNumbers;
}
