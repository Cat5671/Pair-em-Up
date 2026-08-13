import { getNonZeroNumbers, EMPTY_CELL } from '@/entities/game';
import { shuffle } from '@/shared/array/shuffle';

/**
 * @param {Array<Array<Number>>} field
 * @returns {Array<Array<Number>>}
 */
export function shuffleField(field) {
  const nonZeroNumbers = getNonZeroNumbers(field);
  const newArray = shuffle(nonZeroNumbers);

  let k = 0;
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (field[i][j] !== EMPTY_CELL) {
        field[i][j] = newArray[k];
        k += 1;
      }
    }
  }
  return field;
}
