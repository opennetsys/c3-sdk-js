const test = require('tape')
const txparamcoder = require('./txparamcoder')

test('txparamcoder', t => {
  t.plan(5)

  t.equal(txparamcoder.encodeMethodName('myMethod'), '0xcbbf8a92fd90f20d804bf89baafba8eb0faef816def7231faa7d21eec7b65a6a')
  t.equal(txparamcoder.encodeParam('hello'), '0x68656c6c6f')
  t.deepEqual(txparamcoder.encodeParams('hello', 'world'), ['0x68656c6c6f', '0x776f726c64'])
  t.deepEqual(txparamcoder.toJSONArray('hello', 'world'), `["hello","world"]`)
  t.deepEqual(txparamcoder.appendJSONArrays(
    txparamcoder.toJSONArray('hello', 'world'),
    txparamcoder.toJSONArray('foo', 'bar')
  ), `[["hello","world"],["foo","bar"]]`)
})
