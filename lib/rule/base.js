'use strict';
/**
 * Rule module
 * @module Rule
 * @see module:index
 */
const lang = require('zero-lang');

function isValidRule(props) {
  if (!lang.isPlainObject(props)) {
    return false;
  }
  if (!lang.isNil(props.priority) && !lang.isNumber(props.priority)) {
    return false;
  }
  if (!lang.isFunction(props.suggest)) {
    return false;
  }
  return true;
}

const DEFAULT_PROPS = {
  priority: 0,
  suggest() {
  },
};

class Rule {
  constructor(props) {
    const me = this;
    if (props.constructor === me.constructor) {
      return props;
    }
    props = lang.extend({}, DEFAULT_PROPS, props);
    if (!isValidRule(props)) {
      throw new TypeError('new Rule(props): invalid props');
    }
    lang.extend(me, props);
  }
}

Rule.isValidRule = isValidRule;

module.exports = Rule;
