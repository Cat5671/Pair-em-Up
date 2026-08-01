import { renderGameBoard, initializeGameField } from './entities/game/index.js';

document.body.prepend(renderGameBoard(initializeGameField('random')));
