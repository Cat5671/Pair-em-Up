const AUTOSAVE_KEY = 'number_match_autosave';

/**
 * @param {Object} gameState
 */
export function saveSessionAutosave(gameState) {
  try {
    sessionStorage.setItem(AUTOSAVE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.error('Ошибка при сохранении игры', e);
  }
}

/**
 * @returns {Object | null}
 */
export function loadSessionAutosave() {
  try {
    const data = sessionStorage.getItem(AUTOSAVE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Ошибка при загрузке игры', e);
    return null;
  }
}

export function clearSessionAutosave() {
  sessionStorage.removeItem(AUTOSAVE_KEY);
}
