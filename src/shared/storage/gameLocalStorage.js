const AUTOSAVE_KEY = 'number_match_autosave';

/**
 * @param {Object} gameState
 */
export function saveLocalAutosave(gameState) {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.error('Ошибка при сохранении игры', e);
  }
}

/**
 * @returns {Object | null}
 */
export function loadLocalAutosave() {
  try {
    const data = localStorage.getItem(AUTOSAVE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Ошибка при загрузке игры', e);
    return null;
  }
}

export function clearLocalAutosave() {
  localStorage.removeItem(AUTOSAVE_KEY);
}
