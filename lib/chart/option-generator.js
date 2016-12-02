'use strict';
/**
 * an class to generate options for ECharts
 * @module option-generator
 * @see module:index
 */
const lang = require('zero-lang');
const util = require('../util/index');
const constant = require('../constant');

const MIN_DATA_ZOOM_LIMIT = 20;

const DEFAULT_OPTION = {
  theme: constant.DEFAULT_THEME_NAME,
  tooltip: {},
  toolbox: {
    feature: {
    }
  },
};

class OptionGenerator {
  constructor(extraOption) {
    const me = this;
    extraOption = extraOption || {};
    me._option = {};
    lang.merge(me._option, DEFAULT_OPTION);
    lang.merge(me._option, util.parseExtraOption(extraOption));
  }

  configCoordinates(coordinates, horizontal, extraOption) {
    const me = this;
    const option = me._option;
    extraOption = extraOption || {};
    let dimensionAxis = 'xAxis';
    let measuresAxis = 'yAxis';
    if (horizontal) {
      const temp = measuresAxis;
      measuresAxis = dimensionAxis;
      dimensionAxis = temp;
    }
    option[dimensionAxis] = lang.extend({
      type: 'category',
      data: coordinates,
    }, extraOption.category);
    option[measuresAxis] = lang.extend({
      type: 'value',
    }, extraOption.value);
    const coordinatesLen = coordinates.length;
    if (coordinatesLen > MIN_DATA_ZOOM_LIMIT) {
      option.dataZoom = [{
        show: true,
        realtime: true,
        start: 0,
        end: 100 * MIN_DATA_ZOOM_LIMIT / coordinatesLen, // show 20 records
      }];
    }
    return me;
  }

  configMeasures(type, measures, dataSet, extraSeriesOption) {
    const me = this;
    const option = me._option;
    option.series = [];
    lang.each(measures, (measure) => {
      const colInfo = dataSet.colByName[measure];
      option.series.push(lang.extend({
        name: colInfo.comments,
        type,
        data: dataSet.colValuesByName[measure],
      }, extraSeriesOption));
    });
    return me;
  }

  configLegend(colNames, dataSet) {
    const me = this;
    const option = me._option;
    option.legend = {
      data: lang.map(colNames, colName => dataSet.colByName[colName].comments)
    };
    return me;
  }

  toOption() {
    return this._option;
  }
}

module.exports = OptionGenerator;
