'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const DataSet = require('./source/data-set');
const util = require('./util/index');

const d2recharts = {
  DataSet,
};
lang.extend(d2recharts, util);

module.exports = d2recharts;
