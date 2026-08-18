/**
 * @param {{'addNumbers': number, 'shuffle':number, 'eraser': number, 'revert': number, 'hints': number}} initialUsesLeft
 */
export function createAssistToolsState(
  initialUsesLeft = {
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
    revert: Infinity,
    hints: 0,
  }
) {
  let usesLeft = { ...initialUsesLeft };
  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser'} btnName
   */
  function checkUsesLeft(btnName) {
    return usesLeft[btnName] > 0;
  }

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints'} btnName
   */
  function getUsesLeft(btnName) {
    return usesLeft[btnName];
  }

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser' | 'hints'} btnName
   * @param {Number} count
   */
  function setUsesLeft(btnName, count) {
    if (count < 0) return;
    usesLeft[btnName] = count;
  }

  /**
   * @param {'addNumbers' | 'shuffle' | 'eraser'} btnName
   */
  function decrement(btnName) {
    if (!checkUsesLeft(btnName)) return;
    usesLeft[btnName] -= 1;
  }

  function getAllUsesLeft() {
    return { ...usesLeft };
  }

  return {
    checkUsesLeft,
    getAllUsesLeft,
    getUsesLeft,
    decrement,
    setUsesLeft,
  };
}
