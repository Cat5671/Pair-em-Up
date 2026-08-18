// @ts-check
import {
  renderGameBoard,
  renderGameCell,
  EMPTY_CELL,
  CELLS_PER_ROW,
} from '@/entities/game';
import { isAdjacentCells, isValidPair } from '@/features/matchCells';

/**
 * @param {Array<Array<Number>>} field
 * @param {{ (firstCell: { row: number; col: number; value: number; }, secondCell: { row: number; col: number; value: number; }): void; (arg0: { row: number; col: number; value: number; }, arg1: { row: number; col: number; value: number; }): void; }} handleMatch
 * @param {(isDisable: Boolean) => void} onCellChosen
 * @returns {{element: HTMLElement, updateCellValues: () => void;addNewCells: (i: Number, j: Number) => void;removeCells: (i: Number, j: Number) => void;getFirstChosenCell: () => {i: number;j: number;value: number;} | null;clearCell: (i: Number, j: Number) => void;returnCellNumber: (row: Number, col: Number, value: Number) => void;}}
 */
export function createGameWidget(field, handleMatch, onCellChosen) {
  /**
   * @type {{ i: number; j: number; value: number} | null}
   */
  let firstChosenCell = null;
  /**
   * @type {HTMLElement | null}
   */
  let firstCell = null;

  const gameBoard = renderGameBoard(field, handleCellClick);

  /**
   * @param {number} row
   * @param {number} col
   * @returns {HTMLElement | null}
   */
  function getChosenCell(row, col) {
    return gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }

  /**
   * @param {Number} i
   * @param {Number} j
   * @param {Number} value
   */
  function handleCellClick(i, j, value) {
    if (!firstChosenCell) {
      firstChosenCell = { i, j, value };
      firstCell = getChosenCell(i, j);
      if (!firstCell) return;
      firstCell.classList.add('cell--active');
      onCellChosen(false);
      return;
    } else if (firstChosenCell.i !== i || firstChosenCell.j !== j) {
      const value1 = firstChosenCell.value;
      const value2 = field[i][j];

      if (
        isValidPair(value1, value2) &&
        isAdjacentCells(firstChosenCell.i, firstChosenCell.j, i, j, field) &&
        handleMatch
      ) {
        handleMatch(
          { row: firstChosenCell.i, col: firstChosenCell.j, value: value1 },
          { row: i, col: j, value: value2 }
        );
      }
    }

    onCellChosen(true);
    firstCell?.classList.remove('cell--active');
    firstChosenCell = null;
    firstCell = null;
  }

  function updateCellValues() {
    const allCells = gameBoard.querySelectorAll('.cell');
    for (let i = 0; i < allCells.length; i += 1) {
      const cell = allCells[i];
      if (!(cell instanceof HTMLElement)) continue;
      const dataRow = cell.dataset.row;
      const dataCol = cell.dataset.col;
      if (!dataRow || !dataCol) continue;
      const row = parseInt(dataRow);
      const col = parseInt(dataCol);
      if (field[row][col] === EMPTY_CELL) continue;
      cell.textContent = `${field[row][col]}`;
    }
  }

  /**
   * @param {Number} lastRow
   * @param {Number} cellsPerLastRow
   * @returns {void}
   */
  function addNewCells(lastRow, cellsPerLastRow) {
    const fragment = new DocumentFragment();
    let h = cellsPerLastRow;
    for (let i = lastRow; i < field.length; i += 1) {
      for (let j = h; j < field[i].length; j += 1) {
        fragment.append(renderGameCell(i, j, field[i][j]));
      }
      h = 0;
    }
    gameBoard.append(fragment);
  }

  /**
   * @param {number} i
   * @param {number} j
   * @returns {void}
   */
  function clearCell(i, j) {
    const cell = getChosenCell(i, j);
    firstChosenCell = null;
    if (!cell) return;
    cell.textContent = '';
    cell.classList.remove('cell--active');
    cell.classList.add('cell--crossed');
  }

  /**
   * @param {number} startRowInd
   * @param {number} cellsPerStartRow
   * @returns {void}
   */
  function removeCells(startRowInd, cellsPerStartRow) {
    const allCells = gameBoard.querySelectorAll('.cell');
    const index = startRowInd * CELLS_PER_ROW + cellsPerStartRow;
    for (let i = index; i < allCells.length; i += 1) {
      allCells[i].remove();
    }
  }

  /**
   * @param {number} row
   * @param {number} col
   * @param {Number} value
   * @returns {void}
   */
  function returnCellNumber(row, col, value) {
    const chosenCell = getChosenCell(row, col);
    if (!chosenCell) return;
    chosenCell.textContent = `${value}`;
    chosenCell.classList.remove('cell--crossed');
  }

  return {
    element: gameBoard,
    updateCellValues,
    addNewCells,
    removeCells,
    getFirstChosenCell: () => firstChosenCell,
    clearCell,
    returnCellNumber,
  };
}
