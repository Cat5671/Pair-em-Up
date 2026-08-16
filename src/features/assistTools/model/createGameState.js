export function createGameState() {
  /** @type {{name: 'addNumbers' | 'shuffle' | 'eraser', usesLeft: Number}| null} */
  let button = null;

  /** @type {Array<Array<Number>> | null} */
  let field = null;

  /** @type {Number}  */
  let score = 0;

  /** @type {{ firstCell: {row: Number, col: Number, value: Number}, secondCell: {row: Number, col: Number, value: Number} | null } | null} */
  let pair = null;

  /**
   * @param {Array<Array<Number>> | null} newField
   * @param {Number} newScore
   * @param {{name: 'addNumbers' | 'shuffle' | 'eraser', usesLeft: Number}| null} btnState
   * @param {{ firstCell: {row: Number, col: Number, value: Number}, secondCell: {row: Number, col: Number, value: Number} | null } | null} newPair
   */
  function saveState(newField, newScore, btnState, newPair = null) {
    button = btnState ? { ...btnState } : null;
    field = structuredClone(newField);
    score = newScore;
    pair = !newPair ? null : { ...newPair };
  }

  function clearState() {
    this.button = null;
    this.field = null;
    this.score = 0;
    this.pair = null;
  }

  function getState() {
    return { button, field, score, pair };
  }

  return {
    getState,
    saveState,
    clearState,
  };
}
