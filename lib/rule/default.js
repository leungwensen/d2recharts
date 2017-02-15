'use strict';
/**
 * rules fits 0-dimension
 * @module 0-dimension
 * @see module:index
 */
const Bar = require('../chart/bar');
const Gauge = require('../chart/gauge');
const Indicator = require('../chart/indicator');
const IndicatorList = require('../chart/indicatorList');
const Line = require('../chart/line');
const Pie = require('../chart/pie');
const Radar = require('../chart/radar');
const Table = require('../chart/table');
const Text = require('../chart/text');

function noDimensionAndHasMeasures(dimensionAndMeasures) {
  return (!dimensionAndMeasures.dimension &&
  dimensionAndMeasures.measures &&
  dimensionAndMeasures.measures.length > 0);
}

function haveDimensionAndMeasures(dimensionAndMeasures) {
  return (dimensionAndMeasures.dimension && dimensionAndMeasures.measures.length > 0);
}

module.exports = (Smart) => {
  Smart.registerRules([
    // no dimension
    {
      priority: 2,
      suggest(dataSet, dimensionAndMeasures) {
        // Gauge goes first
        if (noDimensionAndHasMeasures(dimensionAndMeasures)) {
          return Gauge;
        }
      },
    },
    {
      priority: 1,
      suggest(dataSet, dimensionAndMeasures) {
        // indicator
        if (noDimensionAndHasMeasures(dimensionAndMeasures)) {
          return Indicator;
        }
      },
    },
    // have dimension
    {
      priority: 3,
      suggest(dataSet, dimensionAndMeasures) {
        // bar
        if (haveDimensionAndMeasures(dimensionAndMeasures)) {
          return Bar;
        }
      },
    },
    {
      priority: 3,
      suggest(dataSet, dimensionAndMeasures) {
        // line
        if (haveDimensionAndMeasures(dimensionAndMeasures)) {
          return Line;
        }
      },
    },
    {
      priority: 2,
      suggest(dataSet, dimensionAndMeasures) {
        // line
        if (haveDimensionAndMeasures(dimensionAndMeasures) && dataSet.rowsCount <= 20) {
          return Pie;
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
          return Radar;
        }
      },
    },
    {
      suggest(dataSet, dimensionAndMeasures) {
        if (dimensionAndMeasures.dimension) {
          return Indicator;
        }
      }
    },
    // backups
    {
      suggest(dataSet) {
        // text
        if (dataSet.isEmpty() || (dataSet.rowsCount === 1 && dataSet.colsCount === 1)) {
          return Text;
        }
      },
    },
    {
      suggest(dataSet) {
        // table
        if (!dataSet.isEmpty()) {
          return Table;
        }
      },
    },
  ]);
};
