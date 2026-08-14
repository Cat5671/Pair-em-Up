import { createElement } from '@/shared/dom/createDomElem';
import './resetBtn.scss';

/**
 * @param {() => void} onClick
 */
export function renderResetBtn(onClick) {
  const button = createElement('button', 'reset-button', 'Reset');
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
}
