'use strict';
/**
 * try2init module
 * @module try2init
 * @see module:index
 */
const try2get = require('try2get');

module.exports = DataSet => (source) => try2get.one(
  () => new DataSet(source),
  () => DataSet.fromFlattenData(source),
  () => DataSet.fromCSV(source),
  () => DataSet.mockFromMeta(source)
) || new DataSet(); // empty data set
