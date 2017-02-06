function unescapeQuotes(str) {
  return str.replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

module.exports = function (formatter) {
  const str = unescapeQuotes(formatter);
  const original = ['{value}'];
  const prefix = str.match(/prefix\(['"]?(.+?)['"]?\)/);
  const suffix = str.match(/suffix\(['"]?(.+?)['"]?\)/);
  if (prefix && prefix[1]) {
    original.unshift(prefix[1]);
  }
  if (suffix && suffix[1]) {
    original.push(suffix[1]);
  }

  return original.join('');
};
