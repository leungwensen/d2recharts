'use strict';
/**
 * d2indicator module
 * @module d2indicatorList
 * @see module:index
 */
import "./indicatorList.less";
const _ = require('lodash');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');
const util = require('../util/index');

class IndicatorList extends NonEcharts {
  getRenderContent() {
    const me = this;
    const props = me.props;
    const meta = (props['data-sourceResMeta'] && props['data-sourceResMeta'].meta) ? props['data-sourceResMeta'].meta : {};
    const indicatorList = props.data.data.map((item, index) => {
      return (
        <li key={index} className="d2indicator-item">
          <div className="dimension">
            <div className="key">{meta[item.name] ? meta[item.name].displayName : item.name}</div>
            <div className="value">{item.value}</div>
          </div>
          <div className="measure">
            <div className="key">同比</div>
            <div className="value d2recharts-green">{item.baseCompare}</div>
          </div>
          <div className="measure">
            <div className="key">环比</div>
            <div className="value d2recharts-red">{item.relativeCompare}</div>
          </div>
        </li>
      )
    });
   const content = (
     <ul className="d2indicator-list">
       { indicatorList }
     </ul>
   )
    return content;
  }
}

IndicatorList.propTypes = propTypes.rechartsWithData;

module.exports = IndicatorList;
