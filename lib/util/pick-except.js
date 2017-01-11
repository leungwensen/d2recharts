'use strict';
/**
 * pick-except module
 * @module pick-except
 * @see module:index
 */
const _ = require('lodash');

module.exports = (obj, exception) => {
  const keys = _.keys(obj);
  const pickKeys = _.difference(keys, exception);
  return _.pick(obj, pickKeys);
};
