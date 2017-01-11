'use strict';
/**
 * from-csv module
 * @module from-csv
 * @see module:index
 * @see https://github.com/johanbjurling/csvparser/blob/master/lib/simplecsvparser.js
 */
const _ = require('lodash');

function parse(str, delimiter) {
  delimiter = delimiter || ',';
  const result = [];
  const csvArray = str.split('\n');

  const firstRow = csvArray.shift();
  const columnKeys = firstRow.split(delimiter);

  _.each(csvArray, (row) => {
    const csvRowArray = row.split(delimiter);
    const jsonRow = {};
    if (csvRowArray.length === columnKeys.length) {
      _.each(csvRowArray, (part, index) => {
        // fixing numeric values
        jsonRow[columnKeys[index]] = isNaN(part) ? part : parseFloat(part, 10);
      });
      result.push(jsonRow);
    }
  });
  return result;
}

module.exports = DataSet => (source) => {
  if (!_.isString(source)) {
    throw new TypeError('DataSet.fromCSV(source): invalid CSV data');
  }
  return new DataSet(parse(source));
};
