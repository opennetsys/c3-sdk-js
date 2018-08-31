const hexutil = require('./hexutil')
const hashlib = require('./hashutil')

function encodeMethodName (name) {
  return hashlib.hashToHexString(Buffer.from(name))
}

function encodeParam (arg) {
  return hexutil.encodeToString(Buffer.from(arg))
}

function encodeParams (...args) {
  return args.map(x => hexutil.encodeToString(Buffer.from(x)))
}

function toJSONArray (...args) {
  return JSON.stringify(args)
}

function appendJSONArrays (...args) {
  const combined = []

  for (let i = 0; i < args.length; i++) {
    combined.push(JSON.parse(args[i]))
  }

  return JSON.stringify(combined)
}

module.exports = {
  encodeMethodName,
  encodeParam,
  encodeParams,
  toJSONArray,
  appendJSONArrays
}
