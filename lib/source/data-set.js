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
   *     {name: 'sold', comments: '销量', formatter: '', type: 'number'}
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
        colInfo.comments = colInfo.displayName || colInfo.name;
      }
    });

    // 整理schema和data
    const currentSchemaNames = lang.map(me.schema, item => item.name);
    lang.each(me.data, (row) => {
      lang.forIn(row, (value, key) => {
        if (!lang.contains(currentSchemaNames, key)) {
          // 补全schema
          me.schema.push({
            name: key,
            comments: key,
            index: currentSchemaNames.length,
          });
          currentSchemaNames.push(key);
        }
      });
    });
    lang.each(me.data, (row) => {
      lang.each(currentSchemaNames, (name) => {
        if (!lang.hasKey(row, name)) {
          // 补全data
          row[name] = '';
        }
      });
    });

    // flatten rows
    me.flattenRows = lang.map(me.data, (row) => {
      const resultRow = [];
      lang.each(me.schema, (colInfo, index) => {
        colInfo.index = index;
        resultRow.push(row[colInfo.name]);
      });
      return resultRow;
    });

    // colValuesByName
    me.colValuesByName = {};
    lang.each(me.data, (row) => {
      lang.forIn(row, (value, key) => {
        me.colValuesByName[key] = me.colValuesByName[key] || [];
        me.colValuesByName[key].push(value);
      });
    });

    // type (by guessing or pre-defined)
    // colNames by type
    // col by name
    // cols by type
    // unique column values rate
    me.colNamesByType = {
      string: [],
      number: [],
    };
    me.colsByType = {};
    me.colByName = {};
    lang.each(me.schema, (colInfo) => {
      const name = colInfo.name;
      const colValues = me.colValuesByName[name];
      colInfo.values = colValues; // add values
      const type = colInfo.type = util.guessItemsTypes(colValues);
      if (!me.colNamesByType[type]) {
        me.colNamesByType[type] = [];
      }
      if (!me.colsByType[type]) {
        me.colsByType[type] = [];
      }
      if (colValues.length) {
        colInfo.uniqueRate = lang.uniq(colValues).length / colValues.length;
      } else {
        colInfo.uniqueRate = 0;
      }
      me.colNamesByType[type].push(colInfo.name);
      me.colsByType[type].push(colInfo);
      me.colByName[colInfo.name] = colInfo;
    });

    // alias
    me.cols = me.schema;

    // rows and cols info
    me.rowsCount = data.length;
    me.colsCount = me.cols.length;

    return me;
  }

  isEmpty() {
    const me = this;
    if (me.rowsCount === 0 && me.colsCount === 0) {
      return true;
    }
    return false;
  }
}

const mockFromMeta = require('./mock-from-meta')(DataSet);

lang.extend(DataSet, {
  fromCSV: require('./from-csv')(DataSet),
  fromFlattenData: require('./from-flatten-data')(DataSet),
  mockFromMeta,
  mockFromSchema: mockFromMeta,
  try2init: require('./try2init')(DataSet),
});

module.exports = DataSet;
