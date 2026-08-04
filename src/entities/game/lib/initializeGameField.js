import { shuffle } from '@/shared/array/shuffle.js';
import { getRandomNumber } from '@/shared/getRandomNumber.js';
import { chunk } from '@/shared/array/chunk.js'; 
import { CLASSIC_GRID, INITIAL_CELLS_COUNT, CELLS_PER_ROW } from '../config/constants.js';

/**
 * @param {Array<Number>} array
 * @returns {Array<Number>}
 */
function splitNumbersToDigits(array) {
  const newArray = [];
  for (let elem of array) {
    if (elem > 10) {
      newArray.push(Math.floor(elem / 10));
    }
    newArray.push(elem % 10);
  }
  return newArray;
}

/**
 * @param {'classic' | 'random' | 'chaotic'} mode
 */
export function initializeGameField(mode) {
  let newArray = [];
  if (mode === 'classic') {
    newArray = splitNumbersToDigits(CLASSIC_GRID);
  } else if (mode === 'random') {
    const shuffledArr = shuffle(CLASSIC_GRID);
    newArray = splitNumbersToDigits(shuffledArr);
  } else if (mode === 'chaotic') {
    for (let i = 0; i < INITIAL_CELLS_COUNT; i += 1) {
      newArray.push(getRandomNumber(1, 9));
    }
  }
  return chunk(newArray, CELLS_PER_ROW);
}
