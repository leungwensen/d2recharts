'use strict';
/**
 * prop-types module
 * @module prop-types
 * @see module:index
 */
const React = require('react');
const _ = require('lodash');
const DataSet = require('../source/data-set');
const util = require('../util/index');

const recharts = {
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  className: React.PropTypes.string,
  lazyUpdate: React.PropTypes.bool,
  notMerge: React.PropTypes.bool,
  onChartReady: React.PropTypes.func,
  onEvents: React.PropTypes.object,
  option: React.PropTypes.object,
  showLoading: React.PropTypes.bool,
  style: React.PropTypes.object,
  theme: React.PropTypes.string,
};

const rechartsWithData = _.extend({
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.instanceOf(DataSet),
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
}, recharts);

const rechartsWithDataAndCoordinates = _.extend({
  horizontal: React.PropTypes.bool,
  dimension: React.PropTypes.string,
  dimensions: React.PropTypes.array,
  measure: React.PropTypes.string,
  measures: React.PropTypes.array,
}, rechartsWithData);

const rechartsWithDataAndSuggest = _.extend({
  suggest: React.PropTypes.func
}, rechartsWithData);

const propTypes = {
  recharts,
  rechartsWithData,
  rechartsWithDataAndCoordinates,
  rechartsWithDataAndSuggest
};

util.propTypes = propTypes;
module.exports = propTypes;
