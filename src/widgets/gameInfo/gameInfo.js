import { createElement } from "@/shared/dom/createDomElem"; 
import './gameInfo.scss';


/**
 * @param {'classic' | 'random' | 'chaotic'} mode 
 * @param {Number} initialScore
 * @returns {{element: HTMLElement, updateScore: (newScore: number) => void, updateTime: (newTime: String) => void}}
 */
export function createGameInfo(mode, initialScore) {
  const container = createElement('div', 'game-info');

  const label = createElement('span', 'mode_label', 'mode:');
  const gameMode = createElement('span', 'mode__mode', mode);
  const modeContainer = createElement('div', 'mode');
  modeContainer.append(label, gameMode);
 
  const time = createElement('div', 'timer');  
  
  const scoreContainer = createElement('div', 'score');

  const targetScore = createElement('span', 'score__target', '100');
  const separator = createElement('span', 'score__separator', '/');
  const currentScore = createElement('span', 'score__curr', `${initialScore}`);
  scoreContainer.append(currentScore, separator, targetScore);
  
  container.append(modeContainer, time, scoreContainer);

  /**
     * @param {Number} newScore
     * @returns {void}
     */
  function updateScore(newScore) {
    currentScore.textContent = `${newScore}`  
  }
   
  /**
     * @param {String} newTime
     */
  function updateTime(newTime) {
    time.textContent = newTime;
    return newTime;  
  } 

  return {
    element: container, 
    updateScore, 
    updateTime,
  }  
}