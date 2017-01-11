'use strict';
/**
 * round-number-range module
 * @module round-number-range
 * @see module:index
 */
const _ = require('lodash');

function nearestRoundByStep(num, step = 10, seed = 0.1) {
  let result = num;
  while (true) {
    if (seed >= num) {
      result = seed;
      break;
    }
    if (seed >= 100) {
      seed *= 2;
    } else {
      seed *= step;
    }
  }
  return result;
}

module.exports = function roundNumericRange(...args) {
  /**
   * generate a proper min and max value for gauge chart or scatter chart, etc.
   * three possibilities:
   * 0---min---max---xx0
   * {
   *   min: 0,
   *   max: xx0
   * }
   * -xx0---min---0---max---xx0
   * {
   *   min: -xx0,
   *   max: xx0
   * }
   * -xx0---min---max---0
   * {
   *   min: -xx0,
   *   max: 0
   * }
   */
  args = _.flatten(args);
  const max = Math.max.apply(null, args);
  const min = Math.min.apply(null, args);
  const range = {
    max: 100,
    min: 0,
  };

  if (max > 0 && min > 0) {
    range.min = 0;
    range.max = nearestRoundByStep(max);
  }
  if (max < 0 && min < 0) {
    range.max = 0;
    range.min = -nearestRoundByStep(-min);
  }
  if (max > 0 && min < 0) {
    const upperLimit = Math.max(nearestRoundByStep(max), nearestRoundByStep(-min));
    range.max = upperLimit;
    range.min = -upperLimit;
  }

  return range;
};
