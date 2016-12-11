'use strict';
/**
 * specify only data set, automatically render a chart
 * @module d2smart
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const util = require('../util/index');
const propTypes = require('./prop-types');
const Rule = require('../rule/base');
const Table = require('./table');
const Text = require('./text');

const rules = [];

class Smart extends React.Component {
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
    return (
      <ChartComponent data={dataSet} {...extraOption}/>
    );
  }
}

lang.extend(Smart, {
  registerRules(items) {
    lang.each(items, (rule) => {
      if (rule instanceof Rule) {
        rules.push(rule);
      } else {
        try {
          rules.push(new Rule(rule));
        } catch (e) {
        }
      }
    });
    rules.sort((a, b) => (b.priority - a.priority));
  },

  suggestAllCharts(dataSet, props) {
    const Elements = [];
    lang.each(rules, (rule) => {
      const Element = rule.suggest(dataSet, props);
      if (Element) {
        Elements.push(Element);
      }
    });
    return lang.uniq(Elements.concat([
      Table,
      Text,
    ]));
  },

  suggestChart(dataSet, props) {
    let Element;
    lang.some(rules, (rule) => {
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

Smart.propTypes = propTypes.rechartsWithData;

// register default rules
require('../rule/default')(Smart);

module.exports = Smart;
