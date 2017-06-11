/*
 * adapted from https://codepen.io/divswithclass/pen/JoRWdw
 * from a single element (i.e. querySelector or getElementByName)
 * you can add, remove, or toggle a class
 *
 * @param {DOM Element} el - The element to alter
 * @param {String} className - the class name to add, remove, toggle
 */

export const addClass = (element, className) => {
  const el = element;

  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`;
  }
};

export const removeClass = (element, className) => {
  const el = element;

  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
  }
};

export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

export const toggleClass = (element, className) => {
  const el = element;

  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
};

export const setStyle = (element, propertyObject) => {
  const styles = propertyObject;

  Object.assign(element.style, styles);
};

export const findParentByTagName = (element, tagName) => {
  let parent = element;

  while (parent !== null && parent.tagName !== tagName.toUpperCase()) {
    parent = parent.parentNode;
  }
  return parent;
};
