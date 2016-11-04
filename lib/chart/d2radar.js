'use strict';
/**
 * d2radar module
 * @module d2radar
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const D2Recharts = require('./d2recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class D2Radar extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;
    const data = props.data;
    const horizontal = props.horizontal;
    const option = {
    };
    const extraOption = util.pickExcept(props, [
      'data',
      'dimension',
      'measures',
    ]);
    const dataSet = me.dataSet = DataSet.try2init(data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const dimension = dimensionAndMeasures.dimension;
    const measures = dimensionAndMeasures.measures;
    const optionGenerator = new OptionGenerator(option);
    return optionGenerator.toOption();
  }

  render() {
    return (
      <D2Recharts option={this.getOption()}/>
    )
  }
}

D2Radar.propTypes = propTypes.rechartsWithDataAndCoordinates;

module.exports = D2Radar;
