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

class D2Pie extends React.Component {
  getOption() {
    // data => DataSet => option
    const me = this;
    const option = {};
    console.log(me);
    return option;
  }

  render() {
    const me = this;
    const option = me.getOption();
    const props = me.props;
    return (
      <D2Recharts {...props} option={option} />
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
