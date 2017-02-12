'use strict';
/**
 * d2pie module
 * @module d2pie
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const Recharts = require('./recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class Pie extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let name = props.dimension;
    let value = props.measure || (props.measures ? props.measures[0] : '');
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
      'measures',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    if (!name) {
      name = dataSet.colNamesByType.string[0];
    }
    if (!value) {
      value = dataSet.colNamesByType.number[0];
    }
    const pieData = _.map(dataSet.data, (row) => ({
      name: row[name],
      value: row[value],
    }));

    if (_.isNumber(props['data-piecesCount'])) {
      const otherData = pieData.splice(props['data-piecesCount']);
      let otherValue = 0;
      otherData.forEach((item) => {
        otherValue += item.value;
      });
      pieData.push({
        name: '其他',
        value: otherValue,
      });
    }

    _.merge(option, {
      series: [{
        name: dataSet.colByName[value].comments,
        type: 'pie',
        data: pieData,
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

Pie.propTypes = _.extend({
  dimension: React.PropTypes.string,
  measure: React.PropTypes.string,
}, propTypes.rechartsWithData);

module.exports = Pie;
