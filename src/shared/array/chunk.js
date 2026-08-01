/**
 * @param {Array<Number>} array
 * @param {Number} cellsPerRow
 * @returns {Array<Array<Number>>}
 */
export function chunk(array, cellsPerRow) {
  const newArray = [];
  const length = Math.ceil(array.length / cellsPerRow);
  for (let i = 0; i < length; i += 1) {
    const start = i * cellsPerRow;
    newArray.push(array.slice(start, start + cellsPerRow));
  }
  return newArray;
}
