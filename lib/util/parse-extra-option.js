'use strict';
/**
 * parseExtraOption module
 * @module parseExtraOption
 * @see module:index
 */
const lang = require('zero-lang');

const COMMON_OPTION_DELIMITER = '_';

function parseExtraOption(extraOption) {
  const result = {};

  lang.forIn(extraOption, (value, key) => {
    const paths = key.split(COMMON_OPTION_DELIMITER);
    let obj = result;
    let pathSlice;
    while (paths.length > 1) {
      pathSlice = paths.shift();
      obj[pathSlice] = obj[pathSlice] || {};
      obj = obj[pathSlice];
    }
    pathSlice = paths.shift();
    obj[pathSlice] = lang.isPlainObject(value) ? parseExtraOption(value) : value;
  });
  return result;
}
module.exports = parseExtraOption;
