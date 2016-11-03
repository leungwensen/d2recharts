'use strict';
/**
 * d2bar module
 * @module d2bar
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class D2Bar extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;

    const data = props.data;
    let x = props.x;
    let y = props.y;
    let horizontal = props.horizontal;
    const option = {
      // 为不顶到坐标轴
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
    };

    const extraOption = util.pickExcept(props, [
      'data',
      'x',
      'y',
      'horizontal',
    ]);
    if (data) {
      const dataSet = me.dataSet = DataSet.try2init(data);
      // TODO
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

D2Bar.propTypes = propTypes.rechartsWithDataAndCoordinates;

module.exports = D2Bar;
