import { createElement } from '@/shared/dom/createDomElem';
import { renderAssistButton } from '@/features/assistTools';

/**
 * @param {{ addNumbers: Number; shuffle: Number; eraser: Number; revert: Number; hints: Number}} usesLeft
 * @param {{ addNumbers: () => void; shuffle: () => void; eraser: () => void; revert: () => void; hints: null}} handlers
 * @returns {{element: HTMLElement, updateContentButton: (name: 'addNumbers' | 'shuffle' | 'eraser' | 'hints', count: Number) => void}}
 */
export function createAssistToolsWidget(usesLeft, handlers) {
  const container = createElement('div', 'assist-tools');
  const content = createElement('div', 'assist-tools__content');
  const addNumBtn = renderAssistButton(
    usesLeft['addNumbers'],
    'add numbers',
    handlers['addNumbers']
  );
  const eraserBtn = renderAssistButton(
    usesLeft['eraser'],
    'eraser',
    handlers['eraser']
  );
  const shuffleBtn = renderAssistButton(
    usesLeft['shuffle'],
    'shuffle',
    handlers['shuffle']
  );
  const revertBtn = renderAssistButton(
    usesLeft['revert'],
    'revert',
    handlers['revert']
  );

  revertBtn.setUsesLeft('∞');

  const hintsBtn = renderAssistButton(
    usesLeft['hints'],
    'hints',
    handlers['hints']
  );
  content.append(
    addNumBtn.element,
    eraserBtn.element,
    shuffleBtn.element,
    revertBtn.element,
    hintsBtn.element
  );
  container.append(content);

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints'} name
   * @param {Number} count
   * @returns {void
   * }
   */
  function updateContentButton(name, count) {
    if (name === 'addNumbers') {
      addNumBtn.setUsesLeft(count);
    } else if (name === 'eraser') {
      eraserBtn.setUsesLeft(count);
    } else if (name === 'shuffle') {
      shuffleBtn.setUsesLeft(count);
    } else if (name === 'hints') {
      hintsBtn.setUsesLeft(count > 5 ? '5+' : count);
    }
  }
  return {
    element: container,
    updateContentButton,
  };
}
