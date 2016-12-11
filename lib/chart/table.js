'use strict';
/**
 * d2table module
 * @module d2table
 * @see module:index
 */
const lang = require('zero-lang');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');

class Table extends NonEcharts {
  renderContent() {
    // render the dom
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const headerNames = lang.map(dataSet.schema, col => col.name);
    const colByName = dataSet.colByName;
    const rows = dataSet.data;
    const wrapper = me.wrapper;
    wrapper.innerHTML =
`<table class="d2recharts-table">
<thead>
<tr>
${
  lang.map(headerNames, (headerName) => {
    const header = colByName[headerName] || {};
    return `<th>${header.comments}</th>`;
  }).join('')
}
</tr>
</thead>
<tbody>
${
  lang.map(rows, (row) => (
    `<tr>${lang.map(headerNames, name => `<td>${row[name]}</td>`).join('')}</tr>`
  )).join('')
}
</tbody>
</table>`;
    return me;
  }
}

Table.propTypes = propTypes.rechartsWithData;

module.exports = Table;
