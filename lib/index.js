'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const _ = require('lodash');
// charts
const Bar = require('./chart/bar');
const Gauge = require('./chart/gauge');
const Indicator = require('./chart/indicator');
const IndicatorList = require('./chart/indicatorList');
const Line = require('./chart/line');
const Line2 = require('./chart/line2');
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
  IndicatorList,
  Line,
  Line2,
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
_.extend(d2recharts, util, Smart);

module.exports = d2recharts;
