'use strict';
/**
 * an class to generate options for ECharts
 * @module option-generator
 * @see module:index
 */
const _ = require('lodash');
const numeral = require('numeral');
const util = require('../util/index');
const constant = require('../constant');

// const MIN_DATA_ZOOM_LIMIT = 20;

const DEFAULT_OPTION = {
  animation: false,
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
    option[dimensionAxis] = _.extend(option[dimensionAxis], {
      type: 'category',
      data: coordinates,
    }, extraOption.category);

    console.log('extraOption.yAxis', extraOption.yAxis);
    if (extraOption.yAxis) {
      option[measuresAxis] = extraOption.yAxis;
    } else {
      option[measuresAxis] = [{
        type: 'value'
      }];
    }
    _.merge(option.xAxis, this._configXLabel(coordinates, option.grid.bottom));
    _.merge(option[measuresAxis][0], {
      name: option['data-yAxisName'] || ''
    });
    if (_.isNumber(option['data-yAxisMax'])) {
      option[measuresAxis][0].max = option['data-yAxisMax'];
    }
    if (_.isNumber(option['data-yAxisMin'])) {
      option[measuresAxis][0].min = option['data-yAxisMin'];
    }

    if (option['data-showDataZoomInside']) {
      option.dataZoom = [{
        show: true,
        type: 'slider',
        start: _.isPlainObject(option['data-dataZoomInside']) ? option['data-dataZoomInside'].start : 0,
        end: _.isPlainObject(option['data-dataZoomInside']) ? option['data-dataZoomInside'].end : 100
      }];
    } else {
      option.xAxis.axisLabel = _.merge(option.xAxis.axisLabel, {
        interval: Math.round(coordinates.length / 10),
      });
    }
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
        data = data.map((v) => numeral(v).value());
        const formatter = util.reverseFormatter(measureSchema.format);
        if (formatter !== '{value}') {
          option.yAxis.forEach((item) => {
            item.axisLabel = _.merge(option.yAxis.axisLabel, {
              formatter,
            });
          });
        }
      }
      option.series.push(_.extend({
        name: colInfo.comments,
        type,
        data,
        label: {
          normal: {
            show: option['data-showNormalLabel'] || false
          }
        },
        areaStyle: {
          normal: {
            opacity: option['data-showAreaStyle'] ? 1 : 0
          }
        },
        yAxisIndex: (extraSeriesOption.measuresRight && (extraSeriesOption.measuresRight.indexOf(measure) > -1)) ? 1 : 0,
        smooth: option['data-smooth'] || false
      }, extraSeriesOption));
      if (data.length === 1) {
          // 只有一条数据时，显示一个点
          option.series.forEach(item => {
            item.symbol = 'circle';
          })
      }
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
          left: 100,
          right: 100,
          bottom: 30,
        };
        break;
      case 'small':
        this._option.grid = {
          left: 50,
          right: 50,
          bottom: 30,
          containLabel: true,
        };
        break;
      case 'none':
        this._option.grid = {
          left: 0,
          right: 0,
          bottom: 30,
          containLabel: true,
        };
        break;
      default:
        break;
    }
  }

  _configXLabel() {
    const lineWidth = 54 * Math.sqrt(2) - 8;
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
