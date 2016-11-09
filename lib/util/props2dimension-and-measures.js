'use strict';
/**
 * props2dimension-and-measures module
 * @module props2dimension-and-measures
 * @see module:index
 */
const guessDimensionAndMeasures = require('./guess-dimension-and-measures');

function props2DimensionAndMeasures(props, dataSet) {
  let dimension = props.dimension || '';
  let measures = props.measures || [];

  if (!dimension || !measures) {
    const dimensionAndMeasures = guessDimensionAndMeasures(dataSet);
    dimension = dimensionAndMeasures.dimension;
    measures = dimensionAndMeasures.measures;
  }

  return {
    dimension,
    measures,
  };
}

module.exports = props2DimensionAndMeasures;
