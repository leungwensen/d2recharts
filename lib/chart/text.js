'use strict';
/**
 * d2text module
 * @module d2text
 * @see module:index
 */
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');

const EMPTY_TEXT = 'Empty data set';

class Text extends NonEcharts {
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

Text.propTypes = propTypes.rechartsWithData;

module.exports = Text;
