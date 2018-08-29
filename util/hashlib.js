const crypto = require('crypto')
const { sha512_256: sha512B256 } = require('js-sha512')
const hexutil = require('./hexutil')

function generate () {
  // note: 512_256 is a bit faster on x86_64 machines
  return '0x' + sha512B256(crypto.randomBytes(256))
}

function hash (data) {
  return Buffer.from(sha512B256(data), 'hex')
}

function hashToHexString (data) {
  return hexutil.encodeToString(hash(data))
}

function isEqual (hexHash, data) {
  return hexHash === hashToHexString(data)
}

module.exports = {
  generate,
  hash,
  hashToHexString,
  isEqual
}
