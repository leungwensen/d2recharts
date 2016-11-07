'use strict';
/**
 * guess-dimension-and-measures module
 * @module guess-dimension-and-measures
 * @see module:index
 */
const lang = require('zero-lang');

function guessDimensionAndMeasures(dataSet) {
  const result = {};
  const sortedStringCols = (dataSet.colsByType.string || []).sort((a, b) => (b.uniqueRate - a.uniqueRate));
  const sortedCols = dataSet.cols.sort((a, b) => (b.uniqueRate - a.uniqueRate));

  // dimension
  if (sortedStringCols.length) {
    result.dimension = sortedStringCols[0].name;
  } else {
    result.dimension = sortedCols[0].name;
  }

  // measures
  result.measures = lang.difference(lang.map(dataSet.colsByType.number || [], (col) => {
    return col.name;
  }), [result.dimension]);

  return result;
}

module.exports = guessDimensionAndMeasures;
