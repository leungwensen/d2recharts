'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const D2Bar = require('./chart/d2bar');
const D2Line = require('./chart/d2line');
const D2Gauge = require('./chart/d2gauge');
const D2Pie = require('./chart/d2pie');
const D2Radar = require('./chart/d2radar');
const D2Recharts = require('./chart/d2recharts');
const D2RechartsSmart = require('./chart/d2recharts-smart');
const D2Table = require('./chart/d2table');
const D2Text = require('./chart/d2text');
const DataSet = require('./source/data-set');
const OptionGenerator = require('./chart/option-generator');
const util = require('./util/index');

const d2recharts = {
  D2Bar,
  D2Line,
  D2Gauge,
  D2Pie,
  D2Radar,
  D2Recharts,
  D2RechartsSmart,
  D2Table,
  D2Text,
  DataSet,
  OptionGenerator,
};
lang.extend(d2recharts, util, D2RechartsSmart);

module.exports = d2recharts;
