'use strict';
/**
 * d2pie module
 * @module d2pie
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');

class D2Pie extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let name = props.name;
    let value = props.value;
    const option = {
      calculable: true,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
    };

    const extraOption = util.pickExcept(props, [
      'data',
      'name',
      'value',
    ]);
    if (data) {
      const dataSet = me.dataSet = DataSet.try2init(data);
      if (!name) {
        name = dataSet.colNamesByType.string[0];
      }
      if (!value) {
        value = dataSet.colNamesByType.number[0];
      }
      lang.merge(option, {
        series: [{
          name: dataSet.colInfoByName[name].comments,
          type: 'pie',
          data: lang.map(dataSet.data, (row) => ({
            name: row[name],
            value: row[value],
          })),
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

D2Pie.propTypes = lang.extend({
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.instanceOf(DataSet),
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
}, D2Recharts.propTypes);

module.exports = D2Pie;
