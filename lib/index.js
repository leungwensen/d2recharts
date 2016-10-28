'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const D2Pie = require('./chart/d2pie');
const D2Recharts = require('./chart/d2recharts');
const DataSet = require('./source/data-set');
const util = require('./util/index');

const d2recharts = {
  D2Pie,
  D2Recharts,
  DataSet,
};
lang.extend(d2recharts, util);

module.exports = d2recharts;
