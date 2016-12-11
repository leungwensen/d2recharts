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
const lang = require('zero-lang');
const propTypes = require('./prop-types');

class Recharts extends React.Component {
  componentDidMount() {
    // first add
    const me = this;
    const echartObj = me.renderEchartDom();
    const props = me.props;
    const onEvents = props.onEvents || [];

    lang.forIn(onEvents, (eventFunc, eventName) => {
      // ignore the event config which not satisfy
      if (lang.isString(eventName) && lang.isFunction(eventFunc)) {
        // binding event
        echartObj.on(eventName, (param) => {
          eventFunc(param, me, echartObj);
        });
      }
    });

    // on chart ready
    if (lang.isFunction(props.onChartReady)) {
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
    return echarts.getInstanceByDom(me.wrapper) ||
      echarts.init(me.wrapper, theme);
  }

  renderEchartDom() {
    // render the dom
    // init the echart object
    const me = this;
    const echartObj = me.getEchartsInstance();
    const props = me.props;
    // set the echart option
    echartObj.setOption(props.option, props.notMerge || false, props.lazyUpdate || false);
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
    const props = lang.clone(me.props);
    const style = lang.extend({
      width: 'auto',
      height: '300px',
    }, props.style);
    if (props.height) {
      style.height = props.height;
      delete props.height;
    }
    if (props.width) {
      style.width = props.width;
      delete props.width;
    }
    // for render
    return (
      <div ref={(wrapper) => me.wrapper = wrapper} className={props.className} style={style}/>
    );
  }
}

Recharts.propTypes = propTypes.recharts;

module.exports = Recharts;
