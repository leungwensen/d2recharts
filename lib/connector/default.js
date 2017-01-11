'use strict';
/**
 * default data connector
 * @module connector/default
 * @see module:index
 * @see https://github.com/johanbjurling/csvparser/blob/master/lib/simplecsvparser.js
 */

module.exports = (DataSet) => {
  DataSet.registerConnectors([{
    priority: -1,
    toDataSet() {
      return new DataSet(); // default dataSet is an empty DataSet
    },
  }, {
    priority: 10,
    toDataSet(source) {
      return new DataSet(source); // best practise: data inputted is perfect
    },
  }]);
};
