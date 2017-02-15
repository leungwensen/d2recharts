'use strict';
/**
 * d2indicator module
 * @module d2indicator
 * @see module:index
 */
const _ = require('lodash');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');
const util = require('../util/index');

class IndicatorList extends NonEcharts {
  renderContent() {
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
      const dimensionKey = dimensionAndMeasures.dimension;
      const measures = dimensionAndMeasures.measures || [];
      if (item[dimensionKey]) {
        content = `<div class="dimension">
                    <span class="key">${colByName[dimensionKey].comments}</span>
                    <span class="value">${item[dimensionKey]}</span>
                    </div>
                  <div class="measure-wrapper">`;
        _.forIn(item, (value, key) => {
          if (key !== dimensionKey && _.includes(measures, key)) {
            const name = colByName[key].comments;
            const color = value <= 0 ? 'green' : 'red';
            content += `<div class="measure">
                          <span class="key">${name}</span>
                          <span class="value d2recharts-${color}">${value}</span>
                        </div>`;
          }
        });
      } else if (measures.length) {
        const first = dimensionAndMeasures.measures[0];
        content = `<div class="main-measure">
                    <span class="key">${colByName[first].comments}</span>
                    <span class="value">${item[first]}</span>
                  </div>
                <div class="measure-wrapper">`;
        _.forIn(item, (value, key) => {
          if (key !== first && _.includes(measures, key)) {
            const name = colByName[key].comments;
            const color = value <= 0 ? 'green' : 'red';
            content += `<div class="measure">
                          <span class="key">${name}</span>
                          <span class="value d2recharts-${color}">${value}</span>
                        </div>`;
          }
        });
      }
      content += '</div>';
      return `<li class="d2indicator-item ${extraClassname}">${content}</li>`;
    }

    wrapper.innerHTML =`<ul class="d2indicator">
                            ${_.map(rows, (row, index) => renderRow(row, index)).join('')}
                        </ul>`;
    return me;
  }
}

IndicatorList.propTypes = propTypes.rechartsWithData;

module.exports = IndicatorList;
