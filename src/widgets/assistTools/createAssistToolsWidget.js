import { createElement } from '@/shared/dom/createDomElem';
// @ts-ignore
import addIcon from '@/shared/assets/icons/add.svg';
// @ts-ignore
import eraserIcon from '@/shared/assets/icons/eraser.svg';
// @ts-ignore
import shuffleIcon from '@/shared/assets/icons/shuffle.svg';
// @ts-ignore
import revertIcon from '@/shared/assets/icons/revert.svg';
// @ts-ignore
import hintsIcon from '@/shared/assets/icons/hints.svg';
import { renderAssistButton } from '@/features/assistTools';
import './assistTools.scss';

/**
 * @param {{ addNumbers: Number; shuffle: Number; eraser: Number; revert: Number; hints: Number}} usesLeft
 * @param {{ addNumbers: () => void; shuffle: () => void; eraser: () => void; revert: () => void; hints: null}} handlers
 * @returns {{element: HTMLElement, updateContentButton: (name: 'addNumbers' | 'shuffle' | 'eraser' | 'hints', count: Number) => void, toggleButtonDisabled: (name: 'addNumbers' | 'shuffle' | 'eraser' | 'hints' | 'revert', isDisable: Boolean) => void}}
 *
 */
export function createAssistToolsWidget(usesLeft, handlers) {
  const container = createElement('div', 'assist-tools');
  const content = createElement('div', 'assist-tools__content');
  const icons = {
    addNumbers: addIcon,
    eraser: eraserIcon,
    shuffle: shuffleIcon,
    revert: revertIcon,
    hints: hintsIcon,
  };

  const fragment = new DocumentFragment();
  for (const [key, value] of Object.entries(usesLeft)) {
    // @ts-ignore
    fragment.append(renderAssistButton(value, key, icons[key], handlers[key]));
  }

  content.append(fragment);
  container.append(content);

  for (let [key, value] of Object.entries(usesLeft)) {
    if (value > 0) continue;
    // @ts-ignore
    toggleButtonDisabled(key, true);
  }

  toggleButtonDisabled('hints', true);
  toggleButtonDisabled('eraser', true);

  updateContentButton('revert', Infinity);

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints' | 'revert'} name
   */
  function getButton(name) {
    return content.querySelector(`[data-name="${name}"]`);
  }

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints' | 'revert'} name
   * @param {Number} count
   * @returns {void
   * }
   */
  function updateContentButton(name, count) {
    const btn = getButton(name);
    const usesLeft = btn?.querySelector('.assist-tool__uses-left');
    if (!btn || !usesLeft) return;
    if (name === 'hints') {
      usesLeft.textContent = `${count > 5 ? '5+' : count}`;
    } else if (name === 'revert') {
      usesLeft.textContent = '∞';
    } else {
      usesLeft.textContent = `${count}`;
    }
  }
  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints' | 'revert'} name
   * @param {Boolean} isDisable
   */
  function toggleButtonDisabled(name, isDisable) {
    const btn = getButton(name);
    const usesLeft = btn?.querySelector('.assist-tool__uses-left');
    if (!btn || !usesLeft) return;
    btn.classList.toggle('assist-tool--disabled', isDisable);
    usesLeft.classList.toggle('assist-tool__uses-left--disabled', isDisable);
  }

  return {
    element: container,
    updateContentButton,
    toggleButtonDisabled,
  };
}
