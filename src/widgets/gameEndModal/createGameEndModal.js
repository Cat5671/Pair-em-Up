import { createElement } from '@/shared/dom/createDomElem';
import { renderResetBtn } from '@/features/resetGame/ui/resetBtn';
import './gameEndModal.scss';

/**
 * @param {String} message
 * @param {() => void} onClick
 */
export function createGameEndModal(message, onClick) {
  document.body.classList.add('no-scroll');
  const backdrop = createElement('div', 'backdrop');
  const modal = createElement('div', 'modal'); 

  const messageElem = createElement('div', 'modal__message', message);
  const resetBtn = renderResetBtn(onClick);

  modal.append(messageElem, resetBtn);
  backdrop.append(modal);
  return backdrop;
}
