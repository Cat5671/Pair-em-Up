import { EMPTY_CELL } from '@/entities/game';

/**
 * @param {Number} r
 * @param {Number} c1
 * @param {Number} c2
 * @param {Array<Array<Number>>} field
 * @returns {Boolean}
 */
function checkHorizontal(r, c1, c2, field) {
  for (let j = c1 + 1; j < c2; j += 1) {
    if (field[r][j] === EMPTY_CELL) continue;
    return false;
  }
  return true;
}

/**
 * @param {Number} r1
 * @param {Number} r2
 * @param {Number} c
 * @param {Array<Array<Number>>} field
 * @returns {Boolean}
 */
function checkVertical(r1, r2, c, field) {
  for (let j = r1 + 1; j < r2; j += 1) {
    if (field[j][c] === EMPTY_CELL) continue;
    return false;
  }
  return true;
}

/**
 * @param {Number} r1
 * @param {Number} c1
 * @param {Number} r2
 * @param {Number} c2
 * @param {Array<Array<Number>>} field
 * @returns {Boolean}
 */
function checkLinear(r1, c1, r2, c2, field) {
  let h = c1 + 1;
  for (let i = r1; i <= r2; i += 1) {
    for (let j = h; j < field[i].length; j += 1) {
      if (field[i][j] === EMPTY_CELL) continue;
      if (i === r2 && j === c2) return true;
      return false;
    }
    h = 0;
  }
  return true;
}

/**
 * @param {Number} r1
 * @param {Number} c1
 * @param {Number} r2
 * @param {Number} c2
 * @param {Array<Array<Number>>} field
 * @returns {Boolean}
 */
export function isAdjacentCells(r1, c1, r2, c2, field) {
  const minRow = Math.min(r1, r2);
  const maxRow = Math.max(r1, r2);
  const minCol = Math.min(c1, c2);
  const maxCol = Math.max(c1, c2);
  if (r1 === r2) return checkHorizontal(minRow, minCol, maxCol, field);
  else if (c1 === c2) return checkVertical(minRow, maxRow, minCol, field);
  else
    return checkLinear(
      minRow,
      minRow === r1 ? c1 : c2,
      maxRow,
      maxRow === r1 ? c1 : c2,
      field
    );
}
