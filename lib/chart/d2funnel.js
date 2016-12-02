'use strict';
/**
 * d2funnel module
 * @module d2funnel
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
    const option = { // 漏斗图基础设置
      tooltip: {
        trigger: 'item',
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          opacity: 0.7,
        },
      },
    };
    const extraOption = util.pickExcept(props, [
      'data',
      'dimension',
      'measures',
      'horizontal',
      'stack',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const dimension = dimensionAndMeasures.dimension;
    const measures = dimensionAndMeasures.measures;
    const extraSeriesOption = {};

    const optionGenerator = new OptionGenerator(lang.extend(option, extraOption));
    optionGenerator
      .configLegendByData(dataSet.colValuesByName[dimension])
      .configMeasures('funnel', measures, dataSet, extraSeriesOption); // FIXME set series
    return optionGenerator.toOption();
  }

  render() {
    return (
      <D2Recharts option={this.getOption()}/>
    );
  }
}

D2Bar.propTypes = lang.extend({
  stack: React.PropTypes.bool,
}, propTypes.rechartsWithDataAndCoordinates);

module.exports = D2Bar;
