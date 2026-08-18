/**
 * @param {Number} initialTime
 * @returns {{start:  (onTimeChange: (arg0: string) => void) => void, stop: () => void, getTime: () => void}}
 */
export function timer(initialTime) {
  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let tick = undefined;
  let currTime = initialTime;

  /**
   * @param {(arg0: string) => void} onTimeChange
   */
  function start(onTimeChange) {
    if (tick) return;
    onTimeChange(formatTime(currTime));
    tick = setInterval(() => {
      currTime += 1;
      onTimeChange(formatTime(currTime));
    }, 1000);
  }
  function stop() {
    clearInterval(tick);
    tick = undefined;
  }

  function getTime() {
    return currTime;
  }

  return {
    start,
    stop,
    getTime,
  };
}

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

/**
 * @param {number} sec
 */

export function formatTime(sec) {
  const hours = Math.floor(sec / SECONDS_IN_HOUR);
  const minutes = String(
    Math.floor((sec % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
  ).padStart(2, '0');
  const seconds = String(sec % SECONDS_IN_MINUTE).padStart(2, '0');
  return hours === 0
    ? `${minutes}:${seconds}`
    : `${hours}:${minutes}:${seconds}`;
}
