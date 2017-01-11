'use strict';
/**
 * d2funnel module
 * @module d2funnel
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const Recharts = require('./recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class Bar extends React.Component {
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

    const optionGenerator = new OptionGenerator(_.extend(option, extraOption));
    optionGenerator
      .configLegendByData(dataSet.colValuesByName[dimension])
      .configMeasures('funnel', measures, dataSet, extraSeriesOption); // FIXME set series
    const finalOption = optionGenerator.toOption();
    const legend = finalOption.legend.data;
    _.each(finalOption.series, (series) => {
      const oldData = series.data;
      series.data = _.map(oldData, (value, index) => ({
          name: legend[index],
          value,
        }));
      series.label = {
        normal: {
          show: false,
        },
      };
    });
    return finalOption;
  }

  render() {
    return (
      <Recharts option={this.getOption()}/>
    );
  }
}

Bar.propTypes = _.extend({
  stack: React.PropTypes.bool,
}, propTypes.rechartsWithDataAndCoordinates);

module.exports = Bar;
