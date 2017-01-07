'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const containsSameItems = require('./contains-same-items');
const guessDimensionAndMeasures = require('./guess-dimension-and-measures');
const guessItemsTypes = require('./guess-items-type');
const parseExtraOption = require('./parse-extra-option');
const pick = require('./pick');
const pickExcept = require('./pick-except');
const roundNumberRange = require('./round-number-range');
const props2DimensionAndMeasures = require('./props2dimension-and-measures');
const mockData = require('./mock-data');
const meta2schema = require('./meta2schema');
const guessTextWidth = require('./guess-text-width');

module.exports = {
  containsSameItems,
  guessDimensionAndMeasures,
  guessItemsTypes,
  meta2schema,
  mockData,
  parseExtraOption,
  pick,
  pickExcept,
  props2DimensionAndMeasures,
  roundNumberRange,
  guessTextWidth,
};
