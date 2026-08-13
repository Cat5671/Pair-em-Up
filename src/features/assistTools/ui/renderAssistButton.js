import { createElement } from '@/shared/dom/createDomElem';
import './renderAssistButton.scss';

/**
 * @param {Number} usesLeft
 * @param {(() => void) | null} onClick
 * @param {string} btnName
 * @returns {{element: HTMLElement, setUsesLeft: (count: number | string) => void}}
 */
export function renderAssistButton(usesLeft, btnName, onClick) {
  const button = createElement('button', 'assist-tool');

  const buttonName = createElement('span', 'assist-tool__title', `${btnName}`);
  const uses = createElement(
    'span',
    'assist-tool__uses-left',
    `${usesLeft === Infinity ? '∞' : usesLeft}`
  );
  button.dataset.name = btnName;
  button.append(buttonName, uses);

  /**
   * @param {Number | String} count
   */
  function setUsesLeft(count) {
    uses.textContent = `${count}`;
  }

  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return {
    element: button,
    setUsesLeft,
  };
}
