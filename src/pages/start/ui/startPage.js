import { createElement, createImgElement } from '@/shared/dom';
// @ts-ignore
import githubIcon from '@/shared/assets/icons/github.svg';
import { loadLocalStorage } from '@/shared/storage';
import { renderControlBtn } from '@/features/controlGame';
import './startPage.scss';

/**
 * @param {(mode?: 'classic' | 'random' | 'chaotic') => void} onGameStart
 * @param {() => void} onModeSelection t
 */
export function renderStartPage(onGameStart, onModeSelection) {
  const container = createElement('div', 'start-page');
  const title = createElement('h1', 'start-page__title', "Pair 'em Up");

  const authorCreditContainer = createElement('div', 'author-credit');
  const authorCredit = createElement('a', 'author-credit__link', 'Cat5671');
  // @ts-ignore
  authorCredit.href = 'https://github.com/Cat5671';

  const gitHubIcon = createImgElement(
    githubIcon,
    'github',
    'author-credit__icon'
  );

  authorCreditContainer.append(gitHubIcon, authorCredit);

  const controlBtns = createElement('div', 'control-buttons');

  const continueBtn = renderControlBtn('Continue', () => onGameStart());

  if (loadLocalStorage('game')) {
    continueBtn.hidden = false;
  } else continueBtn.hidden = true;

  const newGameBtn = renderControlBtn('New game', () => onModeSelection());

  controlBtns.append(continueBtn, newGameBtn);

  container.append(title, controlBtns, authorCreditContainer);
  return container;
}
