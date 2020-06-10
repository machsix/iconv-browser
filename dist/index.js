Object.defineProperty(exports, '__esModule', { value: true });

var textEncoding = require('@sinonjs/text-encoding');

// another option: https://github.com/r12a/r12a.github.io/blob/master/apps/conversion/conversionfunctions.js
// to use rollup, you need to set `ignoreGlobal = true` for commonjs
//                or manually commented out
// #endif

/**
 * Arraybuffer -> Hex
 * @param {ArrayBuffer} buffer The bytes in an ArrayBuffer.
 * @returns {array} hex representation of bytes
 */

function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), function (x) {
    return ('00' + x.toString(16)).slice(-2);
  });
}
/**
 * Hex -> Arraybuffer
 *
 * @param {string/array} text hex representation of bytes
 * @return {ArrayBuffer} The bytes in an ArrayBuffer.
 */


function hex2buf(text) {
  var hexString = text;

  if (Array.isArray(text)) {
    hexString = text.join('');
  } // remove the leading 0x


  hexString = hexString.replace(/^0x/, ''); // ensure even number of characters

  if (hexString.length % 2 != 0) {
    throw new Error('WARNING: expecting an even number of characters in the hexString');
  } // check for some non-hex characters


  var bad = hexString.match(/[G-Z\s]/i);

  if (bad) {
    throw new Error('WARNING: found non-hex characters', bad);
  } // split the string into pairs of octets


  var pairs = hexString.match(/[\dA-F]{2}/gi); // convert the octets to integers

  var integers = pairs.map(function (s) {
    return parseInt(s, 16);
  });
  var array = new Uint8Array(integers);
  return array.buffer;
}
/**
 * Encode a string into arraybuffer
 * @param {string} text string to encode
 * @param {string} encoding charset
 * @returns {ArrayBuffer} encoded string
 */


function encode(text) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
  var buffer = null;

  if (['utf8', 'utf-8', 'unicode-1-1-utf-8'].includes(encoding)) {
    buffer = new textEncoding.TextEncoder().encode(text);
  } else {
    try {
      buffer = new textEncoding.TextEncoder(encoding, {
        NONSTANDARD_allowLegacyEncoding: true
      }).encode(text);
    } catch (error) {
      buffer = new textEncoding.TextEncoder().encode(text);
    }
  }

  return buffer;
}
/**
 *
 * @param {string} text string to encode
 * @param {string} encoding charset
 * @returns {array} array of hex value for the corresponding arraybuffer
 */

function encodeHex(text) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
  return buf2hex(encode(text, encoding));
}
function decode(uint8array) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
  return new textEncoding.TextDecoder(encoding).decode(uint8array);
}
function decodeHex(stringArray) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
  return decode(hex2buf(stringArray), encoding);
}
function encodeURIE(text) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';

  if (encoding === 'utf-8') {
    return encodeURIE(text);
  }

  function isURIcomponent(str) {
    return /^[A-Za-z0-9;,/?:@&=+$-_.!~*'()#]*$/.test(str);
  }

  return [].map.call(text, function (x) {
    if (isURIcomponent(x)) {
      return x;
    } else {
      return "%".concat(encodeHex(x, encoding).map(function (x) {
        return x.toUpperCase();
      }).join('%'));
    }
  }).join('');
}

exports.decode = decode;
exports.decodeHex = decodeHex;
exports.encode = encode;
exports.encodeHex = encodeHex;
exports.encodeURIE = encodeURIE;
