/**
 * @param {Number} value1
 * @param {Number} value2
 */
export function isValidPair(value1, value2) {
  return value1 === value2 || value1 + value2 === 10;
}

/**
 * @param {number} value1
 * @param {number} value2
 */
export function getScore(value1, value2) {
  if (value1 === 5 && value2 === 5) return 3;
  if (value1 + value2 === 10) return 2;
  return 1;
}
