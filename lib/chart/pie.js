'use strict';
/**
 * d2pie module
 * @module d2pie
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const Recharts = require('./recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class Pie extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let name = props.dimension;
    let value = props.measure;
    const option = {
      calculable: true,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
    };

    const extraOption = util.pickExcept(props, [
      'data',
      'dimension',
      'measure',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    if (!name) {
      name = dataSet.colNamesByType.string[0];
    }
    if (!value) {
      value = dataSet.colNamesByType.number[0];
    }
    lang.merge(option, {
      series: [{
        name: dataSet.colByName[name].comments,
        type: 'pie',
        data: lang.map(dataSet.data, (row) => ({
          name: row[name],
          value: row[value],
        })),
      }]
    }, extraOption);

    const optionGenerator = new OptionGenerator(option);
    return optionGenerator.toOption();
  }

  render() {
    return (
      <Recharts option={this.getOption()}/>
    );
  }
}

Pie.propTypes = lang.extend({
  dimension: React.PropTypes.string,
  measure: React.PropTypes.string,
}, propTypes.rechartsWithData);

module.exports = Pie;
