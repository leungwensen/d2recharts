'use strict';
/**
 * d2table module
 * @module d2table
 * @see module:index
 */
const _ = require('lodash');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');

class Table extends NonEcharts {
  renderContent() {
    // render the dom
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const headerNames = _.map(dataSet.schema, col => col.name);
    const colByName = dataSet.colByName;
    const rows = dataSet.data;
    const wrapper = me.wrapper;
    wrapper.innerHTML =
`<table class="d2recharts-table">
<thead>
<tr>
${
  _.map(headerNames, (headerName) => {
    const header = colByName[headerName] || {};
    return `<th>${header.comments}</th>`;
  }).join('')
}
</tr>
</thead>
<tbody>
${
  _.map(rows, (row) => (
    `<tr>${_.map(headerNames, name => `<td>${row[name]}</td>`).join('')}</tr>`
  )).join('')
}
</tbody>
</table>`;
    return me;
  }
}

Table.propTypes = propTypes.rechartsWithData;

module.exports = Table;
