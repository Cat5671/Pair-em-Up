import { createElement } from '@/shared/dom';
import { loadLocalAutosave } from '@/shared/storage';
import { renderControlBtn } from '@/features/controlGame';
import './gameMenu.scss';

/**
 * @param {() => void} onReset
 * @param {() => void} onSave
 * @param {() => void} onContinue
 * @param {() => void} onReturnToGame
 */
export function renderGameMenu(onReset, onSave, onContinue, onReturnToGame) {
  const backdrop = createElement('div', 'game-menu-backdrop');
  const modal = createElement('div', 'game-menu-modal');

  backdrop.append(modal);

  const controlBtns = createElement('div', 'modal__control-btns');

  const resetBtn = renderControlBtn('Reset', onReset);

  const continueBtn = renderControlBtn('Continue', onContinue);
  if (loadLocalAutosave()) {
    continueBtn.hidden = false;
  } else continueBtn.hidden = true;

  const saveBtn = renderControlBtn('Save', () => {
    onSave();
    if (continueBtn.hidden) {
      continueBtn.hidden = false;
    }
  });

  controlBtns.append(continueBtn, saveBtn, resetBtn);

  const navigationBtns = createElement('div', 'navigation-btns');
  const backToGame = renderControlBtn('Return to game', () => {
    toggleMenu(false);
    onReturnToGame();
  });

  navigationBtns.append(backToGame);

  modal.append(controlBtns, navigationBtns);

  /**
   * @param {Boolean} isOpen
   */
  function toggleMenu(isOpen) {
    backdrop.classList.toggle('game-menu-backdrop--open', isOpen);
  }

  return {
    element: backdrop,
    toggleMenu,
  };
}
