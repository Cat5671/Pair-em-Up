import { createElement } from '@/shared/dom/createDomElem';
import { mutateMatrix } from '@/shared/array/mutateMatrix.js';
import { initializeGameField } from '@/entities/game';
import {
  addNumbersToGrid,
  shuffleField,
  removeNumber,
  findHints,
} from '@/features/assistTools';
import { getScore } from '@/features/matchCells';
import { createGameWidget } from '@/widgets/gameBoardWidget/createGameWidget';
import { createAssistToolsWidget } from '@/widgets/createAssistToolsWidget';

/**
 * @param {'classic' | 'random' | 'chaotic'} mode
 * @returns {HTMLElement}
 */
export function renderGamePage(mode = 'classic') {
  const gameField = initializeGameField(mode);
  let score = 0;
  let hints = 0;

  const previousState = {
    /** @type {{name: 'addNumbers' | 'shuffle' | 'eraser', usesLeft: Number}| null} */
    button: null,

    /** @type {Array<Array<Number>> | null} */
    field: null,

    /** @type {Number}  */
    score: 0,

    /** @type {{ firstCell: {row: Number, col: Number, value: Number}, secondCell: {row: Number, col: Number, value: Number} | null } | null} */
    pair: null,

    /**
     * @param {Array<Array<Number>> | null} field
     * @param {Number} score
     * @param {{name: 'addNumbers' | 'shuffle' | 'eraser', usesLeft: Number}| null} btnState
     * @param {{ firstCell: {row: Number, col: Number, value: Number}, secondCell: {row: Number, col: Number, value: Number} | null } | null} pair
     */
    saveState(field, score, btnState, pair = null) {
      this.button = btnState ? { ...btnState } : null;
      this.field = structuredClone(field);
      this.score = score;
      this.pair = !pair ? null : { ...pair };
    },

    clearState() {
      this.button = null;
      this.field = null;
      this.score = 0;
      this.pair = null;
    },
  };

  const container = createElement('div', 'game-page');

  const handleMatch = (
    /** @type {{row: Number, col: Number, value: Number}} */ firstCell,
    /** @type {{row: Number, col: Number, value: Number}} */ secondCell
  ) => {
    previousState.saveState(gameField, score, null, { firstCell, secondCell });
    removeNumber(firstCell.row, firstCell.col, gameField);
    removeNumber(secondCell.row, secondCell.col, gameField);
    score += getScore(firstCell.value, secondCell.value);
    gameBoard.clearCell(firstCell.row, firstCell.col);
    gameBoard.clearCell(secondCell.row, secondCell.col);
    handleHints();
  };

  const gameBoard = createGameWidget(gameField, handleMatch);
  const usesLeft = {
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
    revert: Infinity,
    hints: 0,
  };

  const handleAddNumbers = () => {
    if (usesLeft['addNumbers'] <= 0) {
      usesLeft['addNumbers'] = 0;
      return false;
    }

    previousState.saveState(gameField, score, {
      name: 'addNumbers',
      usesLeft: usesLeft['addNumbers'],
    });

    const lastRow = gameField.length - 1;
    const [row, col] = [lastRow, gameField[lastRow].length];
    addNumbersToGrid(mode, gameField);
    gameBoard.addNewCells(row, col);

    handleHints();

    usesLeft['addNumbers'] = usesLeft['addNumbers'] - 1;
    assistTools.updateContentButton('addNumbers', usesLeft['addNumbers']);
  };

  const handleShuffle = () => {
    if (usesLeft['shuffle'] <= 0) {
      usesLeft['shuffle'] = 0;
      return false;
    }

    previousState.saveState(gameField, score, {
      name: 'shuffle',
      usesLeft: usesLeft['shuffle'],
    });

    shuffleField(gameField);
    gameBoard.updateCellValues();

    handleHints();

    usesLeft['shuffle'] = usesLeft['shuffle'] - 1;
    assistTools.updateContentButton('shuffle', usesLeft['shuffle']);
    return true;
  };

  const handleEraser = () => {
    if (usesLeft['eraser'] <= 0) {
      usesLeft['eraser'] = 0;
      return false;
    }

    const firstCell = gameBoard.getFirstChosenCell();
    if (!firstCell) return false;
    const { i, j } = firstCell;

    previousState.saveState(
      gameField,
      score,
      { name: 'eraser', usesLeft: usesLeft['eraser'] },
      {
        firstCell: { row: i, col: j, value: gameField[i][j] },
        secondCell: null,
      }
    );
    removeNumber(i, j, gameField);
    gameBoard.clearCell(i, j);

    handleHints();

    usesLeft['eraser'] = usesLeft['eraser'] - 1;
    assistTools.updateContentButton('eraser', usesLeft['eraser']);
    return true;
  };

  const handleRevert = () => {
    if (!previousState.field) return;
    mutateMatrix(gameField, previousState.field);

    const button = previousState.button;
    const firstCell = previousState.pair?.firstCell;
    const secondCell = previousState.pair?.secondCell;

    if (button) {
      if (button.name === 'addNumbers') {
        const lastRow = gameField.length - 1;
        gameBoard.removeCells(lastRow, gameField[lastRow].length);
      } else if (button.name === 'shuffle') {
        gameBoard.updateCellValues();
      } else if (firstCell) {
        gameBoard.returnCellNumber(
          firstCell.row,
          firstCell.col,
          firstCell.value
        );
      }
      usesLeft[button.name] = button.usesLeft;
      assistTools.updateContentButton(button.name, button.usesLeft);
    } else if (firstCell && secondCell) {
      gameBoard.returnCellNumber(firstCell.row, firstCell.col, firstCell.value);
      gameBoard.returnCellNumber(
        secondCell.row,
        secondCell.col,
        secondCell.value
      );
    }

    score = previousState.score;
    handleHints();
    previousState.clearState();
  };

  const handlers = {
    addNumbers: handleAddNumbers,
    shuffle: handleShuffle,
    eraser: handleEraser,
    revert: handleRevert,
    hints: null,
  };

  const assistTools = createAssistToolsWidget(usesLeft, handlers);
  container.append(assistTools.element, gameBoard.element);

  function handleHints() {
    hints = findHints(gameField);
    usesLeft['hints'] = hints;
    assistTools.updateContentButton('hints', hints);
  }

  handleHints();
  return container;
}
