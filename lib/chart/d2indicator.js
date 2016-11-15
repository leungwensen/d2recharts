'use strict';
/**
 * d2indicator module
 * @module d2indicator
 * @see module:index
 */
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const D2NonEcharts = require('./d2non-echarts');
const util = require('../util/index');

class D2Indicator extends D2NonEcharts {
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
      return `<li class="sc-indicator-item ${extraClassname}">${content}</li>`;
    }

    wrapper.innerHTML =
`<ul class="sc-indicator">
    ${lang.map(rows, (row, index) => renderRow(row, index)).join('')}
</ul>`;
    return me;
  }
}

D2Indicator.propTypes = propTypes.rechartsWithData;

module.exports = D2Indicator;
