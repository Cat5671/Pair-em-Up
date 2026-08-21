import { createElement, createImgElement } from '@/shared/dom';
import { clearLocalStorage, clearSessionAutosave } from '@/shared/storage';
// @ts-ignore
import backToStartIcon from '@/shared/assets/icons/revert.svg';
import { renderControlBtn } from '@/features/controlGame';
import './modeSelectionPage.scss';

/**
 * @param {() => void} onBackToMainMenu
 * @param {(mode: 'classic' | 'random' | 'chaotic') => void} onStartNewGame
 */
export function renderModeSelectionPage(onBackToMainMenu, onStartNewGame) {
  const container = createElement('div', 'mode-selection');
  const title = createElement('h1', 'mode-selection__title', 'SELECT MODE');
  const modeBtnsContainer = createElement('div', 'mode-selection__container');

  const classicModeBtn = renderControlBtn('Classic', () =>
    startNewGame('classic')
  );
  const randomModeBtn = renderControlBtn('Random', () =>
    startNewGame('random')
  );
  const chaoticModeBtn = renderControlBtn('Chaotic', () =>
    startNewGame('chaotic')
  );

  modeBtnsContainer.append(classicModeBtn, randomModeBtn, chaoticModeBtn);

  /**
   * @param {'classic' | 'random' | 'chaotic'} mode
   */
  function startNewGame(mode) {
    clearLocalStorage('game');
    clearSessionAutosave();
    onStartNewGame(mode);
  }

  const returnToStartBtn = createElement('button', 'back-to-start-btn');
  const btnIcon = createImgElement(
    backToStartIcon,
    'back to start',
    'back-to-start-btn__icon'
  );
  returnToStartBtn.append(btnIcon);

  returnToStartBtn.addEventListener('click', onBackToMainMenu);

  container.append(title, modeBtnsContainer, returnToStartBtn);
  return container;
}
