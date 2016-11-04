'use strict';
/**
 * d2gauge module
 * @module d2gauge
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class D2Gauge extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let dataRow = props.dataRow;
    let columns = props.columns;
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
    };

    const extraOption = util.pickExcept(props, [
      'data',
      'dataRow',
      'columns',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    if (!dataRow) {
      dataRow = 0;
    }
    if (!columns) {
      columns = dataSet.colNamesByType.number;
    }
    const seriesData = [];
    const numericValues = [];
    const row = util.pick(dataSet.data[dataRow], columns);
    lang.forIn(row, (value, key) => {
      const numericValue = parseFloat(value, 10);
      const colInfo = dataSet.colByName[key];
      if (!lang.isNaN(numericValue)) {
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
      lang.merge(option, {
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
      <D2Recharts option={this.getOption()}/>
    )
  }
}

D2Gauge.propTypes = lang.extend({
  columns: React.PropTypes.array,
  dataRow: React.PropTypes.number,
}, propTypes.rechartsWithData);

module.exports = D2Gauge;
