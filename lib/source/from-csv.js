'use strict';
/**
 * from-csv module
 * @module from-csv
 * @see module:index
 * @see https://github.com/johanbjurling/csvparser/blob/master/lib/simplecsvparser.js
 */
const lang = require('zero-lang');

function  parse(str, delimiter) {
  delimiter = delimiter || ',';

  const result = [];
  const csvArray = str.split('\n');

  const firstRow = csvArray.shift();
  const columnKeys = firstRow.split(delimiter);

  lang.each(csvArray, (row) => {
    const csvRowArray = row.split(delimiter);
    const jsonRow = {};
    lang.each(csvRowArray, (part, index) => {
      jsonRow[columnKeys[index]] = part;
    });
    result.push(jsonRow);
  });
  return result;
}

module.exports = DataSet => (source) => {
  if (!lang.isString(source)) {
    throw new TypeError('DataSet.fromCSV(source): invalid CSV data');
  }
  return new DataSet(parse(source));
};
