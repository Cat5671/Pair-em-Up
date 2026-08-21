/**
 * @param {'game' | 'settings' | 'liderboard' } key
 * @param {Object} value
 */
export function saveLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Ошибка при сохранении игры', e);
  }
}

/**
 * @param {'game' | 'settings' | 'liderboard' } key
 * @returns {Object | null}
 */
export function loadLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Ошибка при загрузке игры', e);
    return null;
  }
}

/**
 * @param {'game' | 'settings' | 'liderboard' } key
 */
export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}
