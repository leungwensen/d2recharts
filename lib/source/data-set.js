'use strict';
/**
 * data-set module
 * @module data-set
 * @see module:index
 */
const lang = require('zero-lang');
const util = require('../util/index');

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
  for (let i = 1; i < data.length; i++) {
    if (data[i] && !util.containsSameItems(lang.keys(data[i]), lang.keys(data[i - 1]))) {
      return false;
    }
  }
  return true;
}

class DataSet {
  constructor(source) {
    source = source || [];
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
    return me.processData();
  }

  processData() {
    const me = this;
    const data = me.data;
    /*
     * schema info of every column:
     * [
     *   {
     *     name,
     *     index,
     *     comments,
     *   }
     * ]
     */
    if (!me.schema.length) {
      if (data.length) {
        const keys = lang.keys(data[0]);
        me.schema = lang.map(keys, (name, index) => ({
          index,
          name,
        }));
      }
    }

    // comments (default is name)
    lang.each(me.schema, (colInfo) => {
      if (!lang.hasKey(colInfo, 'comments')) {
        colInfo.comments = colInfo.name;
      }
    });

    // flatten rows
    me.flattenRows = lang.map(me.data, (row) => {
      const resultRow = [];
      lang.each(me.schema, (col) => {
        resultRow.push(row[col.name]);
      });
      return resultRow;
    });

    // colByName
    me.colByName = {};
    lang.each(me.data, (row) => {
      lang.forIn(row, (value, key) => {
        me.colByName[key] = me.colByName[key] || [];
        me.colByName[key].push(value);
      });
    });

    // type (by guessing or pre-defined)
    lang.each(me.schema, (colInfo) => {
      colInfo.type = util.guessItemsTypes(me.colByName[colInfo.name]);
    });
    return me;
  }
}

lang.extend(DataSet, {
  fromFlattenData: require('./from-flatten-data')(DataSet),
  try2init: require('./try2init')(DataSet),
});

module.exports = DataSet;
