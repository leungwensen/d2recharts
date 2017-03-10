'use strict';
/**
 * d2indicator module
 * @module d2indicator
 * @see module:index
 */
import "./indicator.less";
const _ = require('lodash');
const DataSet = require('../source/data-set');
const propTypes = require('./prop-types');
const NonEcharts = require('./non-echarts');
const util = require('../util/index');

class Indicator extends NonEcharts {
  getRenderContent() {
    const me = this;
    const props = me.props;
    const dataSet = DataSet.try2init(props.data);
    const dimensionAndMeasures = util.props2DimensionAndMeasures(props, dataSet);
    const colByName = dataSet.colByName;
    const rows = dataSet.data;
    const rowsCount = rows.length;
    // const wrapper = me.wrapper;

    const content = (
      <ul className="d2indicator">
        {
          rows.map((item, index) => {
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
            let li;
            let mersuresArray = [];
            let firstKey;
            let firstClassName;

            if (item[dimensionKey]) {
              firstKey = dimensionKey;
              firstClassName = 'dimension';
            } else if (measures.length) {
              firstKey = dimensionAndMeasures.measures[0];
              firstClassName = 'main-measure';
            }
            _.forIn(item, (value, key) => {
              if (key !== firstKey && _.includes(measures, key)) {
                mersuresArray.push({
                  name: colByName[key].comments,
                  value: value,
                  color: value <= 0 ? 'green' : 'red'
                });
              }
            });
            const tmpArr = [];
            measures.forEach(key => {
              mersuresArray.forEach((item, index) => {
                if (key === item.name) {
                  tmpArr.push(item);
                  mersuresArray.splice(index, 1);
                }
              });
            });
            mersuresArray = tmpArr.concat(mersuresArray);
            li = (
              <li key={index} className={`d2indicator-item ${extraClassname}`}>
                <div className={firstClassName}>
                  <span className="key">{colByName[firstKey].comments}</span>
                  <span className="value">{item[firstKey]}</span>
                </div>
                <div className="measure-wrapper">
                  {
                    mersuresArray.map((item, index) => {
                      return (
                        <div key={index} className="measure">
                          <span className="key">{item.name}</span>
                          <span className={`value d2recharts-${item.color}`}>{item.value}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </li>
            );
            return li;
          })
        }
      </ul>
    );
    return content;
  }
}

Indicator.propTypes = propTypes.rechartsWithData;

module.exports = Indicator;
