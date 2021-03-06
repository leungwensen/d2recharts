'use strict';
/**
 * Rule module
 * @module Rule
 * @see module:index
 */
const _ = require('lodash');

function isValidRule(props) {
  if (!_.isPlainObject(props)) {
    return false;
  }
  if (!_.isNil(props.priority) && !_.isNumber(props.priority)) {
    return false;
  }
  if (!_.isFunction(props.suggest)) {
    return false;
  }
  return true;
}

const DEFAULT_PROPS = {
  priority: 0,
  suggest() {
    throw new Error('invalid rule');
  },
};

class Rule {
  constructor(props) {
    const me = this;
    if (props.constructor === me.constructor) {
      return props;
    }
    props = _.assign({}, DEFAULT_PROPS, props);
    if (!isValidRule(props)) {
      throw new TypeError('new Rule(props): invalid props');
    }
    _.assign(me, props);
  }
}

Rule.isValidRule = isValidRule;

module.exports = Rule;
