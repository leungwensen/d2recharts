'use strict';
/**
 * check if two arrays contains same items
 * @module contains-same-items
 * @see module:index
 */
const _ = require('lodash');

function containsSameItems(arr1, arr2) {
  if (!_.isArray(arr1) || !_.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  const testArr1 = arr1.sort();
  const testArr2 = arr2.sort();
  for (let i = 0; i < testArr1.length; i++) {
    const item1 = testArr1[i];
    const item2 = testArr2[i];
    if (_.isArray(item1) && !containsSameItems(item1, item2)) {
      // nested array
      return false;
    } else if (item1 !== item2) {
      return false;
    }
  }
  return true;
}
module.exports = containsSameItems;
