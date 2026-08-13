import { EMPTY_CELL } from '@/entities/game';

/**
 * @param {Number} i
 * @param {Number} j
 * @param {Array<Array<Number>>} field
 * @returns {Array<Array<Number>>}
 */
export function removeNumber(i, j, field) {
  field[i][j] = EMPTY_CELL;
  return field;
}
