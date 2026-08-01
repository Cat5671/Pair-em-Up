/**
 * @param {number} min
 * @param {number} max
 * @param {Array<Number>} exclude
 * @returns {number}
 */
export function getRandomNumber(min, max, exclude = []) {
  let random;
  do {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(random));
  return random;
}
