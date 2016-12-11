'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
// charts
const Bar = require('./chart/bar');
const Gauge = require('./chart/gauge');
const Indicator = require('./chart/indicator');
const Line = require('./chart/line');
const Pie = require('./chart/pie');
const Radar = require('./chart/radar');
const Recharts = require('./chart/recharts');
const Smart = require('./chart/smart');
const Scatter = require('./chart/scatter');
const Table = require('./chart/table');
const Funnel = require('./chart/funnel');
const Text = require('./chart/text');
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
  Bar,
  Funnel,
  Gauge,
  Indicator,
  Line,
  Pie,
  Radar,
  Recharts,
  Smart,
  Scatter,
  Table,
  Text,
  DataSet,
  OptionGenerator,
};
lang.extend(d2recharts, util, Smart);

module.exports = d2recharts;
