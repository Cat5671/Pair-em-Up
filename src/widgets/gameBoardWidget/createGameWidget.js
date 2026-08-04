import { renderGameBoard, initializeGameField } from '@/entities/game';
import { isAdjacentCells, getScore, isValidPair } from '@/features/matchCells';
import { EMPTY_CELL } from '@/entities/game';

/**
 * @param {'classic' | 'random' | 'chaotic'} mode
 * @returns {HTMLElement}
 */
export function createGameWidget(mode = 'classic') {
  let field = initializeGameField(mode);
  let score = 0;
  /**
   * @type {{ i: number; j: number; value: number} | null}
   */
  let firstChosenCell = null;
  const gameBoard = renderGameBoard(field, handleCellClick);

  const getChosenCell = function (
    /** @type {Number} */ row,
    /** @type {Number} */ col
  ) {
    return gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  };

  /**
   * @param {Number} i
   * @param {Number} j
   * @param {Number} value
   */
  function handleCellClick(i, j, value) {
    if (!firstChosenCell) {
      firstChosenCell = { i, j, value };
      getChosenCell(i, j)?.classList.add('cell--active');
      return;
    } else if (firstChosenCell.i === i && firstChosenCell.j === j) {
      getChosenCell(i, j)?.classList.remove('cell--active');
      firstChosenCell = null;
    } else {
      const value1 = firstChosenCell.value;
      const value2 = field[i][j];

      const firstCell = getChosenCell(firstChosenCell.i, firstChosenCell.j);
      const secondCell = getChosenCell(i, j);
      if (!firstCell || !secondCell) return;

      if (
        isValidPair(value1, value2) &&
        isAdjacentCells(firstChosenCell.i, firstChosenCell.j, i, j, field)
      ) {
        field[firstChosenCell.i][firstChosenCell.j] = EMPTY_CELL;
        field[i][j] = EMPTY_CELL;

        firstCell.classList.add('cell--crossed');
        secondCell.classList.add('cell--crossed');

        firstCell.textContent = '';
        secondCell.textContent = '';

        score += getScore(value1, value2);

        // eslint-disable-next-line no-console
        console.log(score);
      }
      firstCell.classList.remove('cell--active');
      firstChosenCell = null;
    }
  }
  return gameBoard;
}
