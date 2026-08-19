import { createElement, createImgElement } from '@/shared/dom';
import gameMenuIcon from '@/shared/assets/icons/settings.svg';
import './gameMenuBtn.scss';

/**
 * @param {() => void} onClick
 */
export function renderGameMenuBtn(onClick) {
  const btn = createElement('button', 'game-menu-btn');
  const icon = createImgElement(
    gameMenuIcon,
    'game menu',
    'game-menu-btn__icon'
  );
  btn.append(icon);

  if (onClick) {
    btn.addEventListener('click', onClick);
  }
  return btn;
}
