'use strict';
/**
 * elements that is not rendered by echarts
 * @module d2non-echarts
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const propTypes = require('./prop-types');

class NonEcharts extends React.Component {
  componentDidMount() {
    const me = this;
    const props = me.props;
    const wrapper = me.wrapper;
    const onEvents = props.onEvents || [];

    _.forIn(onEvents, (eventFunc, eventName) => {
      // ignore the event config which not satisfy
      if (_.isString(eventName) && _.isFunction(eventFunc)) {
        // binding event
        wrapper.addEventListener(eventName, (e) => {
          eventFunc(e, me, me.wrapper);
        });
      }
    });
    this.renderContent();

    // on chart ready
    if (_.isFunction(props.onChartReady)) {
      props.onChartReady(me, wrapper);
    }
  }

  componentDidUpdate() {
    // this.renderContent();
  }

  renderContent() {
    // render the dom
    // TODO delete
  }

  getRenderContent () {
    // TODO 废弃 renderContent 直接操作 innerHTML 的方式，改为 getRenderContent 返回 jsx 组件
    // get render content
    return null;
  }

  render() {
    const me = this;
    const props = _.clone(me.props);
    const style = _.extend({
      height: 'auto',
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
      <div ref={(wrapper) => me.wrapper = wrapper} className={me.props.className} style={style}>
        {me.getRenderContent()}
      </div>
    );
  }
}

NonEcharts.propTypes = propTypes.rechartsWithData;

module.exports = NonEcharts;
