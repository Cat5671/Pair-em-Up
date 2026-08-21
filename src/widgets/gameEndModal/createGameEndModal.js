import { createElement } from '@/shared/dom/createDomElem';
import { renderControlBtn } from '@/features/controlGame';
import './gameEndModal.scss';

/**
 * @param {String} message
 * @param {() => void} onReset
 * @param {() => void} onReturnToStart
 * @param {String} finalScore
 * @param {String} timer
 * @returns {HTMLElement}
 */
export function createGameEndModal(
  message,
  finalScore,
  timer,
  onReset,
  onReturnToStart
) {
  document.body.classList.add('no-scroll');
  const backdrop = createElement('div', 'backdrop');
  const modal = createElement('div', 'modal');

  const messageElem = createElement('div', 'modal__message', message);
  const gameOutput = createElement('div', 'modal__results');
  const scoreElem = createElement(
    'span',
    'modal__score',
    `Score: ${finalScore}`
  );
  const timerElem = createElement('span', 'modal__timer', `Time: ${timer}`);
  gameOutput.append(scoreElem, timerElem);

  const btnsContainer = createElement('div', 'btns-container');
  const resetBtn = renderControlBtn('Reset', onReset);
  const returnToStartBtn = renderControlBtn('Return to start', onReturnToStart);

  btnsContainer.append(resetBtn, returnToStartBtn);

  modal.append(messageElem, gameOutput, btnsContainer);
  backdrop.append(modal);
  return backdrop;
}
