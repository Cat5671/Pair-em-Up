import { createElement } from '@/shared/dom/createDomElem';
import './controlBtn.scss';

/**
 * @param {String} btnName
 * @param {() => void} onClick
 */
export function renderControlBtn(btnName, onClick) {
  const button = createElement('button', 'control-button', btnName);
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
}
