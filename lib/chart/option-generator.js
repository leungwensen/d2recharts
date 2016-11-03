'use strict';
/**
 * an class to generate options for ECharts
 * @module option-generator
 * @see module:index
 */
const lang = require('zero-lang');
const echarts = require('echarts');
const util = require('../util/index');

const THEME_NAME = 'd2recharts';
const MIN_DATA_ZOOM_LIMIT = 20;

echarts.registerTheme(THEME_NAME, {
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3',
  ],
  backgroundColor: '#fff',
  animation: true,
  animationDelay: 0,
  animationDelayUpdate: 0,
  animationDuration: 500,
  animationDurationUpdate: 300,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
});

const DEFAULT_OPTION = {
  theme: THEME_NAME,
  tooltip: {},
  toolbox: {
    feature: {
      // saveAsImage: {},
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

  configCoordinates(coordinates, isCross, extraOption) {
    const me = this;
    const option = me._option;
    extraOption = extraOption || {};
    let dimensionAxis = 'xAxis';
    let measuresAxis = 'yAxis';
    if (isCross) {
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
  }

  configMeasures(type, measures, dataSet, extraSeriesOption) {
    const me = this;
    const option = me._option;
    option.series = [];
    lang.each(measures, (measure) => {
      const colInfo = dataSet.colInfoByName[measure];
      option.series.push(lang.extend({
        name: colInfo.comments,
        type,
        data: dataSet.colByName[measure],
      }, extraSeriesOption));
    });
  }

  configLegend(colNames, dataSet) {
  }

  toOption() {
    return this._option;
  }
}

module.exports = OptionGenerator;
