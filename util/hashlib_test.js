const test = require('tape')
const hashlib = require('./hashlib')

test('hashlib', t => {
  t.plan(5)

  t.equal(hashlib.generate().toString('hex').length, 66)
  t.equal(hashlib.hash(Buffer.from('hello world')).toString('hex'), Buffer.from('0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017', 'hex').toString('hex'))
  t.equal(hashlib.hashToHexString(Buffer.from('hello world')), '0x0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017')
  t.equal(hashlib.isEqual('0x1234', Buffer.from('foo')), false)
  t.equal(hashlib.isEqual('0x0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017', Buffer.from('hello world')), true)
})
