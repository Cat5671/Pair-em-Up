import './app/styles/index.scss';
import { renderGamePage } from '@/pages/game';

const appRoot = document.body;
/**
 * @param {'classic' | 'chaotic' | 'random'} mode
 */
function createGamePage(mode = 'classic') {
  appRoot.textContent = '';
  appRoot.classList.remove('no-scroll');

  const gamePage = renderGamePage(mode, createGamePage);
  appRoot.append(gamePage);
}

createGamePage('random');
