'use strict';
/**
 * from-flatten-data module
 * @module from-flatten-data
 * @see module:index
 */
const lang = require('zero-lang');

function isValidFlattenData(source) {
  /**
   * Simply check the data structure of the data set.
   * @function isValidDataSet
   * @param {Array} data
   * @return {Boolean}
   * @example
   * // a valid data structure should be like this:
   * // `schema` is required.
   * {
     *   data: [
     *     ['Sports', 275],
     *     ['Strategy', 115],
     *     ['Action', 120],
     *     ['Shooter', 350],
     *     ['Other', 150]
     *   ],
     *   schema: [
     *     {name: 'genre', index: 0, comments: '种类'},
     *     {name: 'sold', index: 1, comments: '销量'}
     *   ]
     * }
   * @example
   * isValidFlattenData(source);
   */
  if (!lang.isPlainObject(source)) {
    return false;
  }
  const data = source.data;
  const schema = source.schema;
  if (!lang.isArray(data) || !lang.isArray(schema)) {
    return false;
  }
  if (data.length && lang.some(data, row => !lang.isArray(row))) {
    return false;
  }
  if (schema.length && lang.some(schema, row => !lang.isPlainObject(row) || !lang.hasKey(row, 'index'))) {
    return false;
  }
  return true;
}

function flattenData2dataSet(source) {
  const data = source.data;
  const schema = source.schema;
  const result = {
    data: [],
    schema,
  };
  if (data.length && schema.length) {
    const sortedSchema = schema.sort((a, b) => (a.index - b.index));
    lang.each(data, (rowArray) => {
      const row = {};
      lang.each(rowArray, (value, index) => {
        row[sortedSchema[index].name] = value;
      });
      result.data.push(row);
    });
  }
  return result;
}

module.exports = (DataSet) => (source) => {
  if (!isValidFlattenData(source)) {
    throw new TypeError('DataSet.fromFlattenData(source): invalid flatten data');
  }
  return new DataSet(flattenData2dataSet(source));
};
