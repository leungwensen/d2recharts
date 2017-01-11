'use strict';
/**
 * Connector module
 * @module Connector
 * @see module:index
 */
const _ = require('lodash');

function isValidConnector(props) {
  if (!_.isPlainObject(props)) {
    return false;
  }
  if (!_.isNil(props.priority) && !_.isNumber(props.priority)) {
    return false;
  }
  if (!_.isFunction(props.toDataSet)) {
    return false;
  }
  return true;
}

const DEFAULT_PROPS = {
  priority: 0,
  toDataSet() {
    throw new Error('invalid connector');
  },
};

class Connector {
  constructor(props) {
    const me = this;
    if (props.constructor === me.constructor) {
      return props;
    }
    props = _.assign({}, DEFAULT_PROPS, props);
    if (!isValidConnector(props)) {
      throw new TypeError('new Rule(props): invalid props');
    }
    _.assign(me, props);
  }
}

Connector.isValidConnector = isValidConnector;

module.exports = Connector;
