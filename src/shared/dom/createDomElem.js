/**
 * @param {String} tagName
 */
export function createElement(tagName, className = '', textContent = '') {
  const obj = document.createElement(tagName);
  obj.classList.add(className);
  obj.textContent = textContent;
  return obj;
}
