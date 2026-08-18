import {
  saveAutosave,
  loadAutosave,
  clearAutosave,
} from '@/shared/storage/gameStorage';
import { createElement } from '@/shared/dom/createDomElem';
import { mutateMatrix } from '@/shared/array/mutateMatrix.js';
import { initializeGameField } from '@/entities/game';
import { timer } from '@/entities/timer/timerLogic';
import {
  addNumbersToGrid,
  shuffleField,
  removeNumber,
  findHints,
  createGameState,
  createAssistToolsState,
} from '@/features/assistTools';
import { getScore } from '@/features/matchCells';
import { createGameWidget } from '@/widgets/gameBoardWidget/createGameWidget';
import { createAssistToolsWidget } from '@/widgets/assistTools/createAssistToolsWidget';
import { createGameInfo } from '@/widgets/gameInfo/createGameInfo';
import './gamePage.scss';

/**
 * @param {'classic' | 'random' | 'chaotic'} mode
 * @returns {HTMLElement}
 */
export function renderGamePage(mode = 'classic') {
  const savedData = loadAutosave();

  // @ts-ignore
  mode = savedData ? savedData.mode : mode;
  // @ts-ignore
  const gameField = savedData ? savedData.field : initializeGameField(mode);
  // @ts-ignore
  let score = savedData ? savedData.score : 0;
  // @ts-ignore
  let initialTime = savedData ? savedData.initialTime : 0;
  let gameTimer = timer(initialTime);
  let hints = 0;
  const previousState = createGameState();

  if (savedData && savedData.history && savedData.history.field) {
    // @ts-ignore
    const h = savedData.history;
    previousState.saveState(h.field, h.score, h.button, h.pair);
  }

  const container = createElement('div', 'game-page');
  const gameInfo = createGameInfo(mode, score);

  gameTimer.start(gameInfo.updateTime);

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
    gameInfo.updateScore(score);
    handleHints();
    triggerAutosave();
    assistTools.toggleButtonDisabled('revert', false);
  };

  const usesLeft = savedData
    ? // @ts-ignore
      createAssistToolsState(savedData.tools)
    : createAssistToolsState();

  const handleAddNumbers = () => {
    if (!usesLeft.checkUsesLeft('addNumbers')) return;

    previousState.saveState(gameField, score, {
      name: 'addNumbers',
      usesLeft: usesLeft.getUsesLeft('addNumbers'),
    });

    assistTools.toggleButtonDisabled('revert', false);

    const lastRow = gameField.length - 1;
    const [row, col] = [lastRow, gameField[lastRow].length];
    addNumbersToGrid(mode, gameField);
    gameBoard.addNewCells(row, col);

    handleHints();

    usesLeft.decrement('addNumbers');
    assistTools.updateContentButton(
      'addNumbers',
      usesLeft.getUsesLeft('addNumbers')
    );

    triggerAutosave();

    if (usesLeft.getUsesLeft('addNumbers') > 0) return;
    assistTools.toggleButtonDisabled('addNumbers', true);
  };

  const handleShuffle = () => {
    if (!usesLeft.checkUsesLeft('shuffle')) return;

    previousState.saveState(gameField, score, {
      name: 'shuffle',
      usesLeft: usesLeft.getUsesLeft('shuffle'),
    });

    assistTools.toggleButtonDisabled('revert', false);

    shuffleField(gameField);
    gameBoard.updateCellValues();

    handleHints();

    usesLeft.decrement('shuffle');
    assistTools.updateContentButton('shuffle', usesLeft.getUsesLeft('shuffle'));

    triggerAutosave();

    if (usesLeft.checkUsesLeft('shuffle')) return;
    assistTools.toggleButtonDisabled('shuffle', true);

    return true;
  };

  const handleEraser = () => {
    if (!usesLeft.checkUsesLeft('eraser')) return;

    const firstCell = gameBoard.getFirstChosenCell();
    if (!firstCell) return false;
    const { i, j } = firstCell;

    previousState.saveState(
      gameField,
      score,
      { name: 'eraser', usesLeft: usesLeft.getUsesLeft('eraser') },
      {
        firstCell: { row: i, col: j, value: gameField[i][j] },
        secondCell: null,
      }
    );

    assistTools.toggleButtonDisabled('revert', false);

    removeNumber(i, j, gameField);
    gameBoard.clearCell(i, j);

    handleHints();

    usesLeft.decrement('eraser');
    assistTools.updateContentButton('eraser', usesLeft.getUsesLeft('eraser'));
    triggerAutosave();

    assistTools.toggleButtonDisabled('eraser', true);
    if (usesLeft.checkUsesLeft('eraser')) return;
    assistTools.toggleButtonDisabled('eraser', true);

    return true;
  };

  const handleRevert = () => {
    const previousGameState = previousState.getState();
    if (!previousGameState.field) return;
    mutateMatrix(gameField, previousGameState.field);

    const button = previousGameState.button;
    const firstCell = previousGameState.pair?.firstCell;
    const secondCell = previousGameState.pair?.secondCell;

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
      usesLeft.setUsesLeft(button.name, button.usesLeft);
      assistTools.updateContentButton(button.name, button.usesLeft);

      if (button.name !== 'eraser' && usesLeft.getUsesLeft(button.name) === 1) {
        assistTools.toggleButtonDisabled(button.name, false);
      }
    } else if (firstCell && secondCell) {
      gameBoard.returnCellNumber(firstCell.row, firstCell.col, firstCell.value);
      gameBoard.returnCellNumber(
        secondCell.row,
        secondCell.col,
        secondCell.value
      );
    }

    score = previousGameState.score;
    gameInfo.updateScore(score);
    handleHints();
    previousState.clearState();
    triggerAutosave();

    assistTools.toggleButtonDisabled('revert', true);
  };

  const handlers = {
    addNumbers: handleAddNumbers,
    shuffle: handleShuffle,
    eraser: handleEraser,
    revert: handleRevert,
    hints: null,
  };

  const assistTools = createAssistToolsWidget(
    usesLeft.getAllUsesLeft(),
    handlers
  );
  const gameBoard = createGameWidget(gameField, handleMatch, (isDisable) => {
    if (!usesLeft.checkUsesLeft('eraser')) return;
    assistTools.toggleButtonDisabled('eraser', isDisable);
  });

  container.append(gameInfo.element, gameBoard.element, assistTools.element);

  function handleHints() {
    hints = findHints(gameField);
    usesLeft.setUsesLeft('hints', hints);
    assistTools.updateContentButton('hints', hints);
  }

  function triggerAutosave() {
    const currentState = {
      mode: mode,
      initialTime: gameTimer.getTime(),
      score: score,
      field: gameField,
      tools: usesLeft.getAllUsesLeft(),
      history:
        previousState.getState() && previousState.getState().field
          ? previousState.getState()
          : null,
    };
    saveAutosave(currentState);
  }

  handleHints();
  if (previousState.getState().field)
    assistTools.toggleButtonDisabled('revert', false);
  else assistTools.toggleButtonDisabled('revert', true);
  triggerAutosave();
  return container;
}
