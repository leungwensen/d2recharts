'use strict';
/**
 * d2line module
 * @module d2line
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class D2Line extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;
    const data = props.data;
    const horizontal = props.horizontal;
    const option = util.pickExcept(props, [
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
    if (props.stack) {
      extraSeriesOption.stack = true;
    }
    const optionGenerator = new OptionGenerator(option);
    optionGenerator
      .configCoordinates(
        dataSet.colValuesByName[dimension],
        horizontal,
        {
          boundaryGap: true,
        }
      )
      .configLegend(measures, dataSet)
      .configMeasures('line', measures, dataSet, extraSeriesOption);
    return optionGenerator.toOption();
  }

  render() {
    return (
      <D2Recharts option={this.getOption()}/>
    );
  }
}

D2Line.propTypes = lang.extend({
  stack: React.PropTypes.bool,
}, propTypes.rechartsWithDataAndCoordinates);

module.exports = D2Line;
