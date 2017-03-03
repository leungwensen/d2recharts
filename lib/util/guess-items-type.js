'use strict';
/**
 * guess the common type of items in an array
 * @module guess-items-type
 * @see module:index
 */
const _ = require('lodash');

module.exports = (arr) => {
  const itemsTypesMap = {};
  let typeWithMaxFreq = 'undefined';
  let maxFreq = 0;

  _.each(arr, (item) => {
    const type = typeof item;
    if (!_.has(itemsTypesMap, type)) {
      itemsTypesMap[type] = 0;
    }
    itemsTypesMap[type]++;
  });
  _.forIn(itemsTypesMap, (count, type) => {
    if (count > maxFreq) {
      maxFreq = count;
      typeWithMaxFreq = type;
    }
  });

  // if types of items are all string, check if numeric numeric like
  if (_.keys(itemsTypesMap).length === 1
    && typeWithMaxFreq === 'string'
    && _.every(arr, item => !isNaN(parseFloat(item, 10)))) {
    typeWithMaxFreq = 'number';
  }

  return typeWithMaxFreq;
};
