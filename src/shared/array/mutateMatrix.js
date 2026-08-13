/**
 * @param {Array<Array<Number>>} targetArray
 * @param {Array<Array<Number>>} sourceArray
 * @returns {void}
 */
export function mutateMatrix(targetArray, sourceArray) {
  targetArray.length = 0;
  for (let i = 0; i < sourceArray.length; i += 1) {
    targetArray.push([...sourceArray[i]]);
  }
}
