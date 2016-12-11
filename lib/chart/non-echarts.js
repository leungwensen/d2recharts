'use strict';
/**
 * elements that is not rendered by echarts
 * @module d2non-echarts
 * @see module:index
 */
const React = require('react');
const lang = require('zero-lang');
const propTypes = require('./prop-types');

class NonEcharts extends React.Component {
  componentDidMount() {
    const me = this;
    const props = me.props;
    const wrapper = me.wrapper;
    const onEvents = props.onEvents || [];

    lang.forIn(onEvents, (eventFunc, eventName) => {
      // ignore the event config which not satisfy
      if (lang.isString(eventName) && lang.isFunction(eventFunc)) {
        // binding event
        wrapper.addEventListener(eventName, (e) => {
          eventFunc(e, me, me.wrapper);
        });
      }
    });
    this.renderContent();

    // on chart ready
    if (lang.isFunction(props.onChartReady)) {
      props.onChartReady(me, wrapper);
    }
  }

  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    // render the dom
  }

  render() {
    const me = this;
    const props = me.props;
    const style = lang.extend({
      height: '300px',
    }, props.style);
    // for render
    return (
      <div ref={(wrapper) => me.wrapper = wrapper} className={me.props.className} style={style}/>
    );
  }
}

NonEcharts.propTypes = propTypes.rechartsWithData;

module.exports = NonEcharts;
