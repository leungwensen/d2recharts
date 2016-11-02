'use strict';
/**
 * pick-except module
 * @module pick-except
 * @see module:index
 */
const lang = require('zero-lang');
const pick = require('./pick');

function pickExcept(obj, exception) {
  const result = {};
  const keys = lang.keys(obj);
  const pickKeys = lang.difference(keys, exception);
  return pick(obj, pickKeys);
}

module.exports = pickExcept;
