'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
// charts
const D2Bar = require('./chart/d2bar');
const D2Gauge = require('./chart/d2gauge');
const D2Indicator = require('./chart/d2indicator');
const D2Line = require('./chart/d2line');
const D2Pie = require('./chart/d2pie');
const D2Radar = require('./chart/d2radar');
const D2Recharts = require('./chart/d2recharts');
const D2RechartsSmart = require('./chart/d2recharts-smart');
const D2Scatter = require('./chart/d2scatter');
const D2Table = require('./chart/d2table');
const D2Funnel = require('./chart/d2funnel');
const D2Text = require('./chart/d2text');
const OptionGenerator = require('./chart/option-generator');
// source
const DataSet = require('./source/data-set');
// util
const util = require('./util/index');
// themes
require('./theme/default');

// stylesheets
require('./index.less');

const d2recharts = {
  D2Bar,
  D2Funnel,
  D2Gauge,
  D2Indicator,
  D2Line,
  D2Pie,
  D2Radar,
  D2Recharts,
  D2RechartsSmart,
  D2Scatter,
  D2Table,
  D2Text,
  DataSet,
  OptionGenerator,
};
lang.extend(d2recharts, util, D2RechartsSmart);

module.exports = d2recharts;
