import { createElement, createImgElement } from '@/shared/dom';

import './renderAssistButton.scss';

/**
 * @param {Number} usesLeft
 * @param {String} iconSrc
 * @param {(() => void) | null} onClick
 * @param {string} btnName
 * @returns {HTMLElement}
 */
export function renderAssistButton(usesLeft, btnName, iconSrc, onClick) {
  const button = createElement('button', 'assist-tool');

  const icon = createImgElement(iconSrc, btnName, 'assist-tool__icon');

  const uses = createElement('span', 'assist-tool__uses-left', `${usesLeft}`);
  button.dataset.name = btnName;
  button.append(icon, uses);

  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
}
