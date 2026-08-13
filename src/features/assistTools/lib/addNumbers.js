import { CELLS_PER_ROW, getNonZeroNumbers } from '@/entities/game';
import { shuffle } from '@/shared/array/shuffle.js';
import { getRandomNumber } from '@/shared/getRandomNumber.js';

/**
 * @param {Array<Array<Number>>} currField
 * @param {Array<Number>} newNumbers
 * @returns {Array<Array<Number>>}
 */

function addCells(currField, newNumbers) {
  for (let i = 0; i < newNumbers.length; i += 1) {
    const num = newNumbers[i];

    // Берем самую последнюю строку на доске
    const lastRow = currField[currField.length - 1];

    // Если в последней строке уже нет места (9 клеток)
    if (lastRow.length === CELLS_PER_ROW) {
      // Создаем новую строку и кладем в нее наше число
      currField.push([num]);
    } else {
      // Иначе просто дописываем число в конец текущей строки
      lastRow.push(num);
    }
  }
  return currField;
}

/**
 * @param {'classic' | 'random' | 'chaotic'} mode
 * @param {Array<Array<Number>>} field
 * @returns {Array<Array<Number>>}
 */

export function addNumbersToGrid(mode, field) {
  const nonZeroNumbers = getNonZeroNumbers(field);
  if (mode === 'classic') {
    return addCells(field, nonZeroNumbers);
  } else if (mode === 'random') {
    const shuffledNumbers = shuffle(nonZeroNumbers);
    return addCells(field, shuffledNumbers);
  } else {
    const length = nonZeroNumbers.length;
    const newArray = [];
    for (let i = 0; i < length; i += 1) {
      newArray.push(getRandomNumber(1, 9));
    }
    return addCells(field, newArray);
  }
}
