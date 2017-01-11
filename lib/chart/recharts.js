'use strict';
/**
 * d2recharts module
 * @module d2recharts
 * @see module:index
 * @see https://github.com/hustcc/echarts-for-react/blob/master/src/echarts-for-react.js
 */
const React = require('react');
const echarts = require('echarts');
const elementResizeEvent = require('element-resize-event');
const _ = require('lodash');
const propTypes = require('./prop-types');

class Recharts extends React.Component {
  constructor(props) {
    super(props);
    this._adjustDataZoom();
  }

  componentDidMount() {
    // first add
    const me = this;
    const echartObj = me.renderEchartDom();
    const props = me.props;
    const onEvents = props.onEvents || [];

    _.each(onEvents, (eventFunc, eventName) => {
      // ignore the event config which not satisfy
      if (_.isString(eventName) && _.isFunction(eventFunc)) {
        // binding event
        echartObj.on(eventName, (param) => {
          eventFunc(param, me, echartObj);
        });
      }
    });

    // on chart ready
    if (_.isFunction(props.onChartReady)) {
      props.onChartReady(me, echartObj);
    }

    // on resize
    elementResizeEvent(me.wrapper, () => {
      echartObj.resize();
    });
  }

  componentDidUpdate() {
    // update
    this.renderEchartDom();
  }

  componentWillUnmount() {
    // remove
    echarts.dispose(this.wrapper);
  }

  getEchartsInstance() {
    // return the echart object
    const me = this;
    const props = me.props;
    const option = props.option;
    const theme = props.theme || option.theme;
    return echarts.getInstanceByDom(me.wrapper) || echarts.init(me.wrapper, theme);
  }

  _adjustDataZoom() {
    const { option } = this.props;
    if (option.dataZoom) {
      const h = Number.parseInt(this.props.height, 10);
      option.dataZoom = _.map(option.dataZoom, (opt) => {
        if (opt.type !== 'inside') {
          opt.top = h - 20;
          opt.bottom = 0;
          opt.right = 2;
        }
        return opt;
      });
      option.grid.bottom = option.grid.bottom ? (option.grid.bottom + 10) : 70;
    }
  }

  renderEchartDom() {
    // render the dom
    // init the echart object
    const me = this;
    const echartObj = me.getEchartsInstance();
    const props = me.props;
    // set the echart option
    echartObj.setOption(props.option, props.notMerge, props.lazyUpdate);
    // set loading mask
    if (props.showLoading) {
      echartObj.showLoading();
    } else {
      echartObj.hideLoading();
    }
    return echartObj;
  }

  render() {
    const me = this;
    const props = _.clone(me.props);
    const style = _.assign({
      width: props.width,
      height: props.height,
    }, props.style);
    // for render
    return (
      <div ref={(wrapper) => me.wrapper = wrapper} className={props.className} style={style}/>
    );
  }
}

Recharts.propTypes = propTypes.recharts;
Recharts.defaultProps = {
  lazyUpdate: true,
  notMerge: true,
  width: 'auto',
  height: '300px',
};

module.exports = Recharts;
