'use strict';
/**
 * d2gauge module
 * @module d2gauge
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const Recharts = require('./recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class Gauge extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let dataRow = props.rowIndex;
    let measures = props.measures;
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
    };

    const extraOption = util.pickExcept(props, [
      'data',
      'rowIndex',
      'measures',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    if (!dataRow) {
      dataRow = 0;
    }
    if (!measures) {
      measures = dataSet.colNamesByType.number;
    }
    const seriesData = [];
    const numericValues = [];
    const row = _.pick(dataSet.data[dataRow], measures);
    _.forIn(row, (value, key) => {
      const numericValue = parseFloat(value, 10);
      const colInfo = dataSet.colByName[key];
      if (!_.isNaN(numericValue)) {
        seriesData.push({
          key,
          value: numericValue,
          name: colInfo.comments,
        });
        numericValues.push(numericValue);
      }
    });
    if (seriesData.length) {
      const range = util.roundNumberRange(numericValues);
      _.merge(option, {
        series: [{
          data: seriesData,
          max: range.max,
          min: range.min,
          type: 'gauge',
        }]
      }, extraOption);
    }

    const optionGenerator = new OptionGenerator(option);
    return optionGenerator.toOption();
  }

  render() {
    return (
      <Recharts option={this.getOption()}/>
    );
  }
}

Gauge.propTypes = _.extend({
  measures: React.PropTypes.array,
  rowIndex: React.PropTypes.number,
}, propTypes.rechartsWithData);

module.exports = Gauge;
