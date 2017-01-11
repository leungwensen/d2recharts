'use strict';
/**
 * mock-from-meta: to generate data from meta
 * typical input:
 * [
 *   {
 *     name: 'xxx',              // name of column
 *     type: 'number',           // type of column data: ['number', 'string', 'date', 'boolean']
 *     comments: 'xxx comments', // display name of column
 *   },
 *   {
 *     name: 'yyy',              // name of column
 *     type: '',                 // type of column data
 *     comments: 'yyy comments', // display name of column
 *   },
 * ]
 * @module mock-from-meta
 * @see module:index
 */
const _ = require('lodash');
const util = require('../util/index');

module.exports = (DataSet) => {
  function toDataSet(meta) {
    if (!_.isArray(meta)) {
      throw new TypeError('DataSet.mockFromMeta(meta): invalid meta');
    }
    const fakeData = {
      data: util.mockData(meta),
      schema: util.meta2schema(meta),
    };
    return new DataSet(fakeData);
  }
  DataSet.mockFromMeta = toDataSet;
  DataSet.registerConnector({
    toDataSet,
  });
};
