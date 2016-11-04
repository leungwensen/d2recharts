'use strict';
/**
 * props2dimension-and-measures module
 * @module props2dimension-and-measures
 * @see module:index
 */
const guessDimensionAndMeasures = require('./guess-dimension-and-measures');

function props2DimensionAndMeasures(props, dataSet) {
  let dimension = props.x;
  let measures = props.y;
  let horizontal = props.horizontal;

  if (!dimension || !measures) {
    const dimensionAndMeasures = guessDimensionAndMeasures(dataSet);
    dimension = dimensionAndMeasures.dimension;
    measures = dimensionAndMeasures.measures;
  }
  if (horizontal) {
    const temp = dimension;
    dimension = measures;
    measures = temp;
  }
  return {
    dimension,
    measures,
  };
}

module.exports = props2DimensionAndMeasures;
