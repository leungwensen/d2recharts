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
  let measuresRight = props.measuresRight || [];

  const dimensionAndMeasures = guessDimensionAndMeasures(dataSet);

  if (!dimension) {
    dimension = dimensionAndMeasures.dimension;
  }
  if (!measures || !measures.length) {
    measures = dimensionAndMeasures.measures;
  }
  if (!measuresRight || !measuresRight.length) {
    measuresRight = dimensionAndMeasures.measuresRight;
  }
  return {
    dimension,
    measures,
    measuresRight
  };
}

module.exports = props2DimensionAndMeasures;
