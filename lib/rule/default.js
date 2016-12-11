'use strict';
/**
 * rules fits 0-dimension
 * @module 0-dimension
 * @see module:index
 */
const D2Bar = require('../chart/d2bar');
const D2Gauge = require('../chart/d2gauge');
const D2Indicator = require('../chart/d2indicator');
const D2Line = require('../chart/d2line');
const D2Pie = require('../chart/d2pie');
const D2Radar = require('../chart/d2radar');
const D2Table = require('../chart/d2table');
const D2Text = require('../chart/d2text');

function noDimensionAndHasMeasures(dimensionAndMeasures) {
  return (!dimensionAndMeasures.dimension &&
  dimensionAndMeasures.measures &&
  dimensionAndMeasures.measures.length > 0);
}

function haveDimensionAndMeasures(dimensionAndMeasures) {
  return (dimensionAndMeasures.dimension && dimensionAndMeasures.measures.length > 0);
}

module.exports = (D2Smart) => {
  D2Smart.registerRules([
    // no dimension
    {
      priority: 2,
      suggest(dataSet, dimensionAndMeasures) {
        // Gauge goes first
        if (noDimensionAndHasMeasures(dimensionAndMeasures)) {
          return D2Gauge;
        }
      },
    },
    {
      priority: 1,
      suggest(dataSet, dimensionAndMeasures) {
        // indicator
        if (noDimensionAndHasMeasures(dimensionAndMeasures)) {
          return D2Indicator;
        }
      },
    },
    // have dimension
    {
      priority: 3,
      suggest(dataSet, dimensionAndMeasures) {
        // bar
        if (haveDimensionAndMeasures(dimensionAndMeasures)) {
          return D2Bar;
        }
      },
    },
    {
      priority: 3,
      suggest(dataSet, dimensionAndMeasures) {
        // line
        if (haveDimensionAndMeasures(dimensionAndMeasures)) {
          return D2Line;
        }
      },
    },
    {
      priority: 2,
      suggest(dataSet, dimensionAndMeasures) {
        // line
        if (haveDimensionAndMeasures(dimensionAndMeasures) && dataSet.rowsCount <= 20) {
          return D2Pie;
        }
      },
    },
    {
      priority: 4,
      suggest(dataSet, dimensionAndMeasures) {
        // line
        if (
          haveDimensionAndMeasures(dimensionAndMeasures) &&
          dataSet.rowsCount >= 3 &&
          dataSet.rowsCount < 10
        ) {
          return D2Radar;
        }
      },
    },
    {
      suggest(dataSet, dimensionAndMeasures) {
        if (dimensionAndMeasures.dimension) {
          return D2Indicator;
        }
      }
    },
    // backups
    {
      suggest(dataSet) {
        // text
        if (dataSet.isEmpty() || (dataSet.rowsCount === 1 && dataSet.colsCount === 1)) {
          return D2Text;
        }
      },
    },
    {
      suggest(dataSet) {
        // table
        if (!dataSet.isEmpty()) {
          return D2Table;
        }
      },
    },
  ]);
};
