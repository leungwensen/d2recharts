'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const containsSameItems = require('./contains-same-items');
const guessItemsTypes = require('./guess-items-type');
const parseExtraOption = require('./parse-extra-option');
const pick = require('./pick');
const pickExcept = require('./pick-except');
const roundNumberRange = require('./round-number-range');

module.exports = {
  containsSameItems,
  guessItemsTypes,
  parseExtraOption,
  pick,
  pickExcept,
  roundNumberRange,
};
