'use strict';
/**
 * guess the common type of items in an array
 * @module guess-items-type
 * @see module:index
 */
const lang = require('zero-lang');

module.exports = (arr) => {
  const itemsTypesMap = {};
  let typeWithMaxFreq = 'undefined';
  let maxFreq = 0;

  lang.each(arr, (item) => {
    const type = typeof item;
    if (!lang.hasKey(itemsTypesMap, type)) {
      itemsTypesMap[type] = 0;
    }
    itemsTypesMap[type]++;
  });
  lang.forIn(itemsTypesMap, (count, type) => {
    if (count > maxFreq) {
      maxFreq = count;
      typeWithMaxFreq = type;
    }
  });
  return typeWithMaxFreq;
};
