'use strict';
/**
 * specify only data set, automatically render a chart
 * @module d2recharts-smart
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const util = require('../util/index');
const propTypes = require('./prop-types');

const rules = [];

class D2RechartsSmart extends React.Component {
  suggestChartComponent(dataSet) {
  }

  suggestAllChartComponents(dataSet) {
  }

  render() {
    const me = this;
    const props = me.props;
    const data = props.data;
    const extraOption = util.pickExcept(props, [
      'data',
    ]);
    const dataSet = DataSet.try2init(data);
    const ChartComponent = me.suggestChartComponent(dataSet);
    return (
      <ChartComponent data={dataSet} {...extraOption}/>
    );
  }
}

D2RechartsSmart.registerRules = () => {
};

D2RechartsSmart.propTypes = propTypes.rechartsWithData;

module.exports = D2RechartsSmart;
