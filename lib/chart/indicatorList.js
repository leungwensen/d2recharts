'use strict';
/**
 * d2indicator module
 * @module d2indicatorList
 * @see module:index
 */
import "./indicatorList.less";
const _ = require('lodash');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');
const util = require('../util/index');

class IndicatorList extends NonEcharts {
  getRenderContent() {
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const colByName = dataSet.colByName;
    let rows = dataSet.data;
    const rowsCount = rows.length;
    const wrapper = me.wrapper;

   let content = (
     <ul className="d2indicator-list">
       {
         props.data.data.map((item, index) => {
            return (
              <li key={index} className="d2indicator-item">
                <div className="dimension">
                  <div className="key">{item.key}</div>
                  <div className="value">{item.value}</div>
                </div>
                <div className="measure">
                  <div className="key">同比</div>
                  <div className="value d2recharts-green">{item.yearOfYear}</div>
                </div>
                <div className="measure">
                  <div className="key">环比</div>
                  <div className="value d2recharts-red">{item.monthOfMonth}</div>
                </div>
              </li>
            )
         })
       }
     </ul>
   )
    return content;
  }
}

IndicatorList.propTypes = propTypes.rechartsWithData;

module.exports = IndicatorList;
