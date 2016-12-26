'use strict';
/**
 * mock-data: to mock data from meta
 * typical input:
 * [
 *   {
 *     name: 'xxx',              // name of column
 *     type: '',                 // type of column data
 *     comments: 'xxx comments', // display name of column
 *   },
 *   {
 *     name: 'yyy',              // name of column
 *     type: '',                 // type of column data
 *     comments: 'yyy comments', // display name of column
 *   },
 * ]
 * @module mock-data
 * @see module:index
 */
const lang = require('zero-lang');

function randomNumberBetween(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}
function randomFromArray(arr) {
  return arr[randomNumberBetween(0, (arr.length - 1))];
}
const randomNames = [
  'Jack',
  'James',
  'John',
  'Lucy',
  'Mary',
  'Rose',
  'Vincent',
];
const DEFAULT_MOCK_STR = 'test';

function sillyMock(name, type) {
  type = type || 'string';
  switch (type) {
    case 'number':
      return randomNumberBetween(0, 100);
    case 'string':
      if (name === 'name') {
        return randomFromArray(randomNames);
      }
      return DEFAULT_MOCK_STR;
    case 'boolean':
      return [true, false][randomNumberBetween(0, 1)];
    case 'date':
      return new Date(randomNumberBetween(0, Date.now()));
    default:
      return DEFAULT_MOCK_STR;
  }
}

module.exports = (meta, rowsCount) => {
  rowsCount = rowsCount || 2; // generate two rows by default
  const result = [];
  for (let i = 0; i < rowsCount; i++) {
    const row = {};
    lang.each(meta, (col) => {
      row[col.name] = sillyMock(col.name, col.type);
    });
    result.push(row);
  }
  return result;
};
