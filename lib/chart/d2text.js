'use strict';
/**
 * d2text module
 * @module d2text
 * @see module:index
 */
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const D2NonEcharts = require('./d2non-echarts');

const EMPTY_TEXT = 'Empty data set';

class D2Text extends D2NonEcharts {
  renderContent() {
    // render the dom
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const wrapper = me.wrapper;
    let text = '';
    if (dataSet.isEmpty()) {
      text = EMPTY_TEXT;
    } else {
      text = `${dataSet.schema[0].comments}: ${dataSet.flattenRows[0][0]}`;
    }
    wrapper.innerHTML = `<p class="d2recharts-text">${text}</p>`;
    return me;
  }
}

D2Text.propTypes = propTypes.rechartsWithData;

module.exports = D2Text;
