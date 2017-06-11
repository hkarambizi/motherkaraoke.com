/*
 * GroupBy from http://www.datchley.name/getting-functional-with-javascript-part-2/
 */

const toString = Object.prototype.toString;
const isFunction = function isFunction(o) {
  return toString.call(o) === '[object Function]';
};

/* eslint no-param-reassign: ["error", { "props": false }]*/
export const groupBy = (list, prop) =>
  list.reduce((grouped, item) => {
    const key = isFunction(prop) ? prop.apply(this, [item]) : item[prop];
    grouped[key] = grouped[key] || [];
    grouped[key].push(item);
    return grouped;
  }, {});
