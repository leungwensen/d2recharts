'use strict';
/**
 * meta2schema: convert meta into DataSet schema
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
 * @module meta2schema
 * @see module:index
 */
module.exports = (meta) => meta;
