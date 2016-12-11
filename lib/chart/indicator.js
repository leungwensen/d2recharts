'use strict';
/**
 * d2indicator module
 * @module d2indicator
 * @see module:index
 */
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');
const util = require('../util/index');

class Indicator extends NonEcharts {
  renderContent() {
    // render the dom
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const colByName = dataSet.colByName;
    const rows = dataSet.data;
    const rowsCount = rows.length;
    const wrapper = me.wrapper;

    function renderRow(item, index) {
      let content = '';
      let extraClassname = '';
      if (index === 0) {
        extraClassname += ' first';
      }
      if (index === rowsCount) {
        extraClassname += ' last';
      }
      lang.forIn(item, (value, key) => {
        const header = colByName[key];
        const name = header.comments;
        if (key === dimensionAndMeasures.dimension) {
          content = `<div class="dimension"><span>${value}</span></div> ${content}`;
        } else if (lang.indexOf(dimensionAndMeasures.measures) === 0) {
          // 假设主度量就是第一个度量
          content += `<div class="main-measure-key">${name}</div><div class="main-measure">${value}</div>`;
        } else {
          content += `<div class="measure"><span class="key">${name}</span> <span class="value">${value}</span></div>`;
        }
      });
      return `<li class="d2indicator-item ${extraClassname}">${content}</li>`;
    }

    wrapper.innerHTML =
`<ul class="d2indicator">
    ${lang.map(rows, (row, index) => renderRow(row, index)).join('')}
</ul>`;
    return me;
  }
}

Indicator.propTypes = propTypes.rechartsWithData;

module.exports = Indicator;
