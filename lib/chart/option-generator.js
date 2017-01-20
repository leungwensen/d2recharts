'use strict';
/**
 * an class to generate options for ECharts
 * @module option-generator
 * @see module:index
 */
const _ = require('lodash');
const util = require('../util/index');
const constant = require('../constant');

// const MIN_DATA_ZOOM_LIMIT = 20;

const DEFAULT_OPTION = {
  theme: constant.DEFAULT_THEME_NAME,
  tooltip : {},
  toolbox: {
    feature: {},
  },
};

class OptionGenerator {
  constructor(extraOption) {
    const me = this;
    extraOption = extraOption || {};
    me._option = {};
    _.merge(me._option, DEFAULT_OPTION);
    _.merge(me._option, util.parseExtraOption(extraOption));
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
    option[dimensionAxis] = _.extend({
      type: 'category',
      data: coordinates,
    }, extraOption.category);
    option[measuresAxis] = _.extend({
      type: 'value',
    }, extraOption.value);
    _.extend(option.xAxis, this._configXLabel(coordinates, option.grid.bottom));
    _.extend(option.yAxis, {
      name: option.yAxisName,
      // min: _.isNumber(option.yAxisMin) ? option.yAxisMin : 'auto',
      // max: _.isNumber(option.yAxisMax) ? option.yAxisMax : 'auto',
      // axisLabel: {
      //   formatter: function (val) {
      //     return `${val} %`; // 显示百分比
      //   }
      // }
    });
    option.dataZoom = [{
      show: option.showDataZoomInside || false,
      start: _.isPlainObject(option.dataZoomInside) ? option.dataZoomInside.start : 0,
      end: _.isPlainObject(option.dataZoomInside) ? option.dataZoomInside.end : 100
    }];
    /*
    const coordinatesLen = coordinates.length;
    if (coordinatesLen > MIN_DATA_ZOOM_LIMIT) {
      option.dataZoom = [{
        show: true,
        realtime: true,
        start: 0,
        end: 100 * MIN_DATA_ZOOM_LIMIT / coordinatesLen, // show 20 records
      }];
    }
     */
    return me;
  }

  configMeasures(type, measures, dataSet, extraSeriesOption) {
    const me = this;
    const option = me._option;
    option.series = [];
    _.each(measures, (measure) => {
      const colInfo = dataSet.colByName[measure];
      const measureSchema = _.find(dataSet.schema, { name: measure });
      let data = dataSet.colValuesByName[measure];
      if (!_.isEmpty(measureSchema.format)) {
        const temp = data[0];
        data = data.map(Number.parseFloat);
        option.yAxis.axisLabel = {
          show: true,
          formatter: temp.replace(/[0-9.]+/, '{value}'),
        };
      }
      option.series.push(_.extend({
        name: colInfo.comments,
        type,
        data,
        label: {
          normal: {
            show: option.showNormalLabel || false
          }
        },
        areaStyle: {
          normal: {
            opacity: option.showAreaStyle ? 1 : 0
          }
        }
      }, extraSeriesOption));
    });
    return me;
  }

  configLegend(colNames, dataSet) {
    const me = this;
    me._option.legend = {
      data: _.map(colNames, colName => dataSet.colByName[colName].comments)
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
