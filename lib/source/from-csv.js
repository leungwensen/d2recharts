'use strict';
/**
 * from-csv module
 * @module from-csv
 * @see module:index
 */
const lang = require('zero-lang');

function tokenize(str, separator) {
  const sl = str.length;
  const tokens = [];
  let t = '';
  let c = null;
  let i = 0;
  let inQuotes = false;

  while (true) {
    c = str[i];

    // check if this is the last character
    if (i + 1 === sl) {
      // handle special quote logic
      if (inQuotes) {
        switch (c) {
          case '"':
            inQuotes = false;
            break;
          default:
            t += c;
        }
        tokens.push(t);
      } else {
        switch (c) {
          case separator:
            if (t.length) {
              tokens.push(t);
            }
            break;
          case '"':
            break;
          case '\n':
            if (t.length) {
              tokens.push(t);
            }
            tokens.push('\n');
            break;
          default:
            t += c;
            tokens.push(t);
        }
      }
      return tokens;
    } else if (i >= sl) {
      // we've passed the last character already
      if (t.length) {
        tokens.push(t);
      }
      return tokens;
    }
    // not the last character so business as usual
    // handle special quote logic
    if (inQuotes) {
      switch (c) {
        case '"':
          // handle escaped quotes
          if (str[i + 1] === '"') {
            i++;
            t += '"';
          } else {
            inQuotes = false;
            tokens.push(t);
            t = '';
          }
          break;
        default:
          t += c;
      }
    } else {
      switch (c) {
        case separator:
          if (t.length) {
            tokens.push(t);
            t = '';
          }
          break;
        case '"':
          // handle escaped quotes
          if (str[i + 1] === '"') {
            i++;
            t += '"';
          } else {
            inQuotes = true;
          }
          break;
        case '\n':
          if (t.length) {
            tokens.push(t);
            t = '';
          }
          tokens.push('\n');
          break;
        default:
          t += c;
      }
    }
    i++;
  }
}

function buildRows(tokens) {
  const rows = [];
  const tl = tokens.length;
  let a = [];
  let doneWithRow = false;
  let i = 0;
  let t = null;

  for (; i < tl; i++) {
    t = tokens[i];

    if (t === '\n') {
      doneWithRow = true;
    } else {
      a.push(t.trim());
    }

    if (doneWithRow) {
      rows.push(a);
      a = [];
      doneWithRow = false;
    }
  }

  if (a.length) {
    rows.push(a);
  }
  return rows;
}

function getRows(str, separator) {
  separator = separator || ',';
  return buildRows(tokenize(str, separator));
}

function getRowsAsObjects(str, separator) {
  separator = separator || ',';
  const rows = getRows(str, separator);
  let r = {};
  const rl = rows.length;
  let i = 0;

  const header = rows[i++];
  const objs = [];

  // there have to be at least 2 rows for this to do anything: header and data
  if (rl < 2) {
    return [];
  }

  for (; i < rl; i++) {
    r = {};
    rows[i].forEach((c, index) => {
      r[header[index]] = c;
    });
    objs.push(r);
  }

  return objs;
}

module.exports = DataSet => (source) => {
  if (!lang.isString(source)) {
    throw new TypeError('DataSet.fromCSV(source): invalid CSV data');
  }
  return new DataSet(getRowsAsObjects(source));
};
