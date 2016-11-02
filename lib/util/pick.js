'use strict';
/**
 * pick module
 * @module pick
 * @see module:index
 */
const lang = require('zero-lang');

function pick(obj, keys) {
  const result = {};
  lang.forIn(obj, (value, key) => {
    if (lang.contains(keys, key)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pick;
