const iconv = require('../dist/index.js');

console.log(iconv.encodeHex('Sample', 'win1251'));
// ['53','61','6d','70','6c','65']

console.log(iconv.decodeHex(['c0','fd','d7','d3'],'gb2312'));
// '例子'