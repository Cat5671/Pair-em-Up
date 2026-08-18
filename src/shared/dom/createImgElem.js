/**
 * @param {String} src
 * @param {String} alt
 */
export function createImgElement(src, alt, className = '') {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add(className);
  return img;
}
