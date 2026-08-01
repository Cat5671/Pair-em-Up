import { shuffle } from '@/shared/array/shuffle.js';
import { getRandomNumber } from '@/shared/getRandomNumber.js';
import { chunk } from '@/shared/array/chunk.js';

const CLASSIC_GRID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
const CELLS_PER_ROW = 9;
const INITIAL_CELLS_COUNT = 27;

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
