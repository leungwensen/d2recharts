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
    feature: {},
  },
};

class OptionGenerator {
  constructor(extraOption) {
    const me = this;
    extraOption = extraOption || {};
    me._option = {};
    lang.merge(me._option, DEFAULT_OPTION);
    lang.merge(me._option, util.parseExtraOption(extraOption));
    this._configLayout();
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
    }, extraOption.category, this._configXLabel(coordinates, option.grid.bottom));
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
    me._option.legend = {
      data: lang.map(colNames, colName => dataSet.colByName[colName].comments)
    };
    return me;
  }

  configLegendByData(data) {
    const me = this;
    me._option.legend = {
      data,
    };
    return me;
  }

  toOption() {
    return this._option;
  }

  _configLayout() {
    switch (this._option.padding) {
      case 'large':
        this._option.grid = {
          left: '12%',
          right: '12%',
          top: 90,
          bottom: 90,
        };
        break;
      case 'small':
        this._option.grid = {
          left: '1%',
          right: '1%',
          containLabel: true,
        };
        break;
      case 'none':
        this._option.grid = {
          left: 0,
          right: 0,
          containLabel: true,
        };
        break;
      default:
        break;
    }
  }

  _configXLabel(data, bottom = 60) {
    const lineWidth = bottom * Math.sqrt(2) - 8;
    return {
      axisLabel: {
        interval: 0,
        rotate: 45,
        formatter: (v) => {
          const defaultWidth = util.guessTextWidth(v);
          if (defaultWidth > lineWidth) {
            const guessLen = Math.floor(lineWidth / 12);
            let start = guessLen;
            let first = v.substr(0, start);
            while (util.guessTextWidth(`${first}...`) <= lineWidth) {
              first += v[start];
              start++;
            }
            return `${first}...`;
            // while (util.guessTextWidth(first) <= lineWidth) {
            //   first += v[start];
            //   start++;
            // }
            // let second = v.slice(start);
            // if (defaultWidth > lineWidth * 2) {
            //   second = v.substr(start, guessLen);
            //   while (util.guessTextWidth(`${second}...`) <= lineWidth) {
            //     second += v[start];
            //     start++;
            //   }
            //   second += '...';
            // }
            // return `${first}\n${second}`;
          }
          return v;
        },
      },
    };
  }
}

module.exports = OptionGenerator;
