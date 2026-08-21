import './app/styles/index.scss';
import { loadSessionAutosave } from '@/shared/storage';
import { renderGamePage } from '@/pages/game';
import { renderStartPage } from '@/pages/start';
import { renderModeSelectionPage } from '@/pages/modeSelection';

const appRoot = document.body;
/**
 * @param {'classic' | 'chaotic' | 'random'} mode
 */
function createGamePage(mode = 'classic') {
  appRoot.textContent = '';
  appRoot.classList.remove('no-scroll');

  const gamePage = renderGamePage(createGamePage, createStartPage, mode);
  appRoot.append(gamePage);
}

function createStartPage() {
  appRoot.textContent = '';
  appRoot.classList.remove('no-scroll');

  appRoot.append(renderStartPage(createGamePage, createModeSelectionPage));
}

function createModeSelectionPage() {
  appRoot.textContent = '';
  appRoot.classList.remove('no-scroll');
  appRoot.append(renderModeSelectionPage(createStartPage, createGamePage));
}

//createGamePage('random');
if (loadSessionAutosave()) createGamePage();
else createStartPage();
