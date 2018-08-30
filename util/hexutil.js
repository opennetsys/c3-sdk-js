const BN = require('bn.js')

function encodeString (str) {
  return addLeader(Buffer.from(str, 'utf8').toString('hex'))
}

function decodeString (hexStr) {
  const str = stripLeader(hexStr)
  return Buffer.from(str, 'hex')
}

function encodeToString (buf) {
  return addLeader(buf.toString('hex')).toLowerCase()
}

function encodeBytes (src) {
  return Buffer.from(src.toString('hex'))
}

function decodeBytes (src) {
  return Buffer.from(src.toString(), 'hex')
}

function encodeInt64 (i) {
  return addLeader(i.toString(16)).toLowerCase()
}

function decodeInt64 (hexStr) {
  return parseInt(hexStr, 16)
}

// https://www.h-schmidt.net/FloatConverter/IEEE754.html
function encodeFloat64 (f) {
  return addLeader(encodeFloat(f).toString('16')).toLowerCase()
}

function decodeFloat64 (hexStr) {
  return Buffer.from(stripLeader(hexStr), 'hex').readFloatBE(0)
}

function encodeBigInt (i) {
  return addLeader(i.toString('hex')).toLowerCase()
}

function decodeBigInt (hexStr) {
  return new BN(stripLeader(hexStr), 'hex')
}

function stripLeader (hexStr) {
  return hexStr.replace(/^0x/, '')
}

function addLeader (str) {
  return '0x' + stripLeader(str)
}

module.exports = {
  encodeString,
  decodeString,
  encodeToString,
  encodeBytes,
  decodeBytes,
  encodeInt64,
  decodeInt64,
  encodeFloat64,
  decodeFloat64,
  encodeBigInt,
  decodeBigInt,
  stripLeader,
  addLeader
}

// @credit: https://stackoverflow.com/a/3107126/1439168
function encodeFloat (number) {
  /*eslint-disable*/
  var n = +number,
    status = (n !== n) || n == -Infinity || n == +Infinity ? n : 0,
    exp = 0,
    len = 281, // 2 * 127 + 1 + 23 + 3,
    bin = new Array(len),
    signal = (n = status !== 0 ? 0 : n) < 0,
    n = Math.abs(n),
    intPart = Math.floor(n),
    floatPart = n - intPart,
    i, lastBit, rounded, j, exponent

  if (status !== 0) {
    if (n !== n) {
      return 0x7fc00000
    }
    if (n === Infinity) {
      return 0x7f800000
    }
    if (n === -Infinity) {
      return 0xff800000
    }
  }

  i = len
  while (i) {
    bin[--i] = 0
  }

  i = 129
  while (intPart && i) {
    bin[--i] = intPart % 2
    intPart = Math.floor(intPart / 2)
  }

  i = 128
  while (floatPart > 0 && i) {
    (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart
  }

  i = -1
  while (++i < len && !bin[i]);

  if (bin[(lastBit = 22 + (i = (exp = 128 - i) >= -126 && exp <= 127 ? i + 1 : 128 - (exp = -127))) + 1]) {
    if (!(rounded = bin[lastBit])) {
      j = lastBit + 2
      while (!rounded && j < len) {
        rounded = bin[j++]
      }
    }

    j = lastBit + 1
    while (rounded && --j >= 0) {
      (bin[j] = !bin[j] - 0) && (rounded = 0)
    }
  }
  i = i - 2 < 0 ? -1 : i - 3
  while (++i < len && !bin[i]);
  (exp = 128 - i) >= -126 && exp <= 127 ? ++i : exp < -126 && (i = 255, exp = -127);
  (intPart || status !== 0) && (exp = 128, i = 129, status == -Infinity ? signal = 1 : (status !== status) && (bin[i] = 1))

  n = Math.abs(exp + 127)
  exponent = 0
  j = 0
  while (j < 8) {
    exponent += (n % 2) << j
    n >>= 1
    j++
  }

  var mantissa = 0
  n = i + 23
  for (; i < n; i++) {
    mantissa = (mantissa << 1) + bin[i]
  }
  return ((signal ? 0x80000000 : 0) + (exponent << 23) + mantissa) | 0
}
