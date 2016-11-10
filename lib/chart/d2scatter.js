'use strict';
/**
 * d2scatter module
 * @module d2scatter
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class D2Scatter extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;
    const data = props.data;
    const extraOption = util.pickExcept(props, [
      'data',
      'measures',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    const colByName = dataSet.colByName;
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const dimension = dimensionAndMeasures.dimension;
    const measures = dimensionAndMeasures.measures; // just need two measures

    if (measures.length < 2 && colByName[dimension].type === 'number') {
      measures.unshift(dimension);
    }
    if (measures.length < 2) {
      throw new TypeError('D2Scatter needs more than two measures.');
    }

    console.log(measures);

    const axises = [];
    for (let i = 0; i <= 1; i++) {
      const colName = measures[i];
      const col = dataSet.colByName[colName];
      const values = lang.map(dataSet.colValuesByName[colName], (value) => {
        const numericValue = parseFloat(value, 10);
        if (lang.isNaN(numericValue)) {
          return 0;
        }
        return numericValue;
      });
      const range = util.roundNumberRange(values);
      axises.push({
        col,
        max: range.max,
        min: range.min,
        colName,
        range,
        title: col.comments,
        values,
      })
    }
    let xAxisMeta = axises[0];
    let yAxisMeta = axises[1];
    if (props.horizontal) {
      const tmp = xAxisMeta;
      xAxisMeta = yAxisMeta;
      yAxisMeta = tmp;
    }
    const option = {
      tooltip: {
        formatter: '({c})'
      },
      xAxis: {
        type: 'value',
        name: xAxisMeta.title,
        nameGap: 25,
        nameLocation: 'middle',
        min: xAxisMeta.min,
        max: xAxisMeta.max,
      },
      yAxis: {
        type: 'value',
        name: yAxisMeta.title,
        min: yAxisMeta.min,
        max: yAxisMeta.max,
      },
      series: {
        type: 'scatter',
        data: lang.map(xAxisMeta.values, (value, index) => [value, yAxisMeta.values[index]]),
      }
    };

    const optionGenerator = new OptionGenerator(lang.extend(option, extraOption));
    return optionGenerator
      .configLegend(measures, dataSet)
      .toOption();
  }

  render() {
    return (
      <D2Recharts option={this.getOption()}/>
    );
  }
}

D2Scatter.propTypes = propTypes.rechartsWithDataAndCoordinates;

module.exports = D2Scatter;
