'use strict';
/**
 * specify only data set, automatically render a chart
 * @module d2smart
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const DataSet = require('../source/data-set');
const util = require('../util/index');
const propTypes = require('./prop-types');
const Rule = require('../rule/base');
const Table = require('./table');
const Text = require('./text');

const rules = [];

class Smart extends React.Component {
  componentDidMount() {
    this.props.suggest({
      candidates: this.candidateChartTypes,
      current: this.currentChartType
    });
  }

  componentDidUpdate() {
    this.props.suggest({
      candidates: this.candidateChartTypes,
      current: this.currentChartType
    });
  }

  currentChartType = '';
  candidateChartTypes = [];

  suggestChart(dataSet, props) {
    return this.constructor.suggestChart(dataSet, props);
  }

  render() {
    const me = this;
    const props = me.props;
    const data = props.data;
    const extraOption = util.pickExcept(props, [
      'data',
    ]);
    const dataSet = DataSet.try2init(data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);

    const ChartComponent = Smart.suggestChart(dataSet, dimensionAndMeasures);
    const currentChartType = ChartComponent.name;

    const allSuggestChartTypes = _.map(Smart.suggestAllCharts(dataSet, dimensionAndMeasures), Chart => Chart.name);
    _.remove(allSuggestChartTypes, currentChartType);
    this.candidateChartTypes = allSuggestChartTypes;
    this.currentChartType = currentChartType;

    return (
      <ChartComponent data={dataSet} {...extraOption}/>
    );
  }
}

_.extend(Smart, {
  registerRule(rule) {
    if (rule instanceof Rule) {
      rules.push(rule);
    } else {
      try {
        rules.push(new Rule(rule));
      } catch (e) {
      }
    }
    rules.sort((a, b) => (b.priority - a.priority));
  },

  registerRules(rs) {
    _.each(rs, (rule) => {
      Smart.registerRule(rule);
    });
  },

  suggestAllCharts(dataSet, props) {
    const Elements = [];
    _.each(rules, (rule) => {
      const Element = rule.suggest(dataSet, props);
      if (Element) {
        Elements.push(Element);
      }
    });
    return _.uniq(Elements.concat([
      Table,
      Text,
    ]));
  },

  suggestChart(dataSet, props) {
    let Element;
    _.some(rules, (rule) => {
      Element = rule.suggest(dataSet, props);
      if (Element) {
        return true;
      }
      return false;
    });
    if (!Element) {
      return Table;
    }
    return Element;
  },
});

Smart.propTypes = propTypes.rechartsWithDataAndSuggest;
Smart.defaultProps = {
  suggest: () => {}
};

// register default rules
require('../rule/default')(Smart);

module.exports = Smart;
