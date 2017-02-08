'use strict';
/**
 * d2line module
 * @module d2line
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const Recharts = require('./recharts');
const DataSet = require('../source/data-set');
const OptionGenerator = require('./option-generator');
const util = require('../util/index');
const propTypes = require('./prop-types');

class Line2 extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const props = me.props;
    const data = props.data;
    const horizontal = props.horizontal;
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      // yAxis: {
      //   axisLine: {
      //     show: false,
      //   },
      //   axisTick: {
      //     show: false,
      //   },
      //   axisLabel: {
      //     textStyle: {
      //       color: '#999',
      //     }
      //   },
      // },
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

    let measures = dimensionAndMeasures.measures;
    let measuresRight = dimensionAndMeasures.measuresRight || [];
    console.log('measures', measures);
    console.log('measuresRight', measuresRight);
    let allMeasures = measures.concat(measuresRight);
    const extraSeriesOption = {};
    if (props.stack) {
      extraSeriesOption.stack = true;
    }
    extraSeriesOption.measures = measures;
    extraSeriesOption.measuresRight = measuresRight;
    extraSeriesOption.allMeasures = allMeasures;
    const optionGenerator = new OptionGenerator(_.merge(option, extraOption));
    optionGenerator
      .configCoordinates(
        dataSet.colValuesByName[dimension],
        horizontal,
        {
          boundaryGap: true,
          yAxis: [
            {
              type: 'value',
              // name: '左侧标题'
            },
            {
              type: 'value',
              // name: '右侧标题'
            },
          ]
        }
      )
      .configLegend(allMeasures, dataSet)
      .configMeasures('line', allMeasures, dataSet, extraSeriesOption);
    console.log('optionGenerator.toOption()', optionGenerator.toOption());
    return optionGenerator.toOption();
  }

  render() {
    return (
      <Recharts option={this.getOption()}/>
    );
  }
}

Line2.propTypes = _.extend({
  stack: React.PropTypes.bool,
}, propTypes.rechartsWithDataAndCoordinates);

module.exports = Line2;
