'use strict';
/**
 * check if two arrays contains same items
 * @module contains-same-items
 * @see module:index
 */
const lang = require('zero-lang');

function containsSameItems(arr1, arr2) {
  if (!lang.isArray(arr1) || !lang.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  const testArr1 = arr1.sort();
  const testArr2 = arr2.sort();
  for (let i = 0; i < testArr1.length; i++) {
    const item1 = testArr1[i];
    const item2 = testArr2[i];
    if (lang.isArray(item1) && !containsSameItems(item1, item2)) {
      // nested array
      return false;
    } else if (item1 !== item2) {
      return false;
    }
  }
  return true;
}
module.exports = containsSameItems;
