'use strict';
/**
 * data-set module
 * @module data-set
 * @see module:index
 */
const lang = require('zero-lang');

function isValidDataSet(dataSet) {
  /**
   * Simply check the data structure of the data set.
   * @function isValidDataSet
   * @param {Array} data
   * @return {Boolean}
   * @example
   * // a valid data structure should be like this:
   * // `schema` is not strictly required.
   * {
     *   data: [
     *     {genre: 'Sports', sold: 275},
     *     {genre: 'Strategy', sold: 115},
     *     {genre: 'Action', sold: 120},
     *     {genre: 'Shooter', sold: 350},
     *     {genre: 'Other', sold: 150}
     *   ],
     *   schema: [
     *     {name: 'genre', comments: '种类'},
     *     {name: 'sold', comments: '销量'}
     *   ]
     * }
   * @example
   * isValidDataSet(dataSet);
   */
  if (!lang.isPlainObject(dataSet)) {
    return false;
  }
  const data = dataSet.data;
  if (!lang.isArray(data)) {
    return false;
  }
  if (data.length && lang.some(data, row => !lang.isPlainObject(row))) {
    return false;
  }
  return true;
}

class DataSet {
  constructor(source) {
    const me = this;
    if (source.constructor === me.constructor) {
      return source;
    }
    if (lang.isArray(source)) {
      return new DataSet({
        data: source,
      });
    }
    if (!isValidDataSet(source)) {
      throw new TypeError('new DataSet(source): invalid data set');
    }
    me.data = source.data;
    me.schema = source.schema || [];
    me.meta = {};
    return me.processData();
  }

  processData() {
    const me = this;
    return me;
  }
}

lang.extend(DataSet, {
  fromFlattenData: require('./from-flatten-data')(DataSet),
});

module.exports = DataSet;
