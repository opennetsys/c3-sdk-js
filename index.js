const fs = require('fs')
const net = require('net')
const EventEmitter = require('events')
const emitter = new EventEmitter()

const port = process.env.PORT || 3330
const registeredMethods = {}

const store = {}
const state = {
  set: (key, value) => {
    if (!(Buffer.isBuffer(key) && Buffer.isBuffer(value))) {
      throw new Error('key and value must be of type Buffer')
    }
    store[key.toString('hex')] = value.toString('hex')
    fs.writeFileSync(sdk.statefile, JSON.stringify(store))
  },
  get: (key) => {
    if (!Buffer.isBuffer(key)) {
      throw new Error('key must be of type Buffer')
    }
    const v = store[key.toString('hex')]
    const found = (v !== undefined)
    const value = Buffer.from(v, 'hex')

    return {
      found,
      value
    }
  }
}

const sdk = {
  statefile: '/tmp/state.json',

  setInitialState () {
    if (!fs.existsSync(this.statefile)) {
      return
    }

    const initialState = fs.readFileSync(this.statefile)
    if (initialState) {
      try {
        const s = JSON.parse(initialState)
        for (let k in s) {
          store[k] = s[k]
        }
      } catch (err) {
        throw new Error('error parsing initial state')
      }
    }
  },

  listen () {
    emitter.on('data', (data) => {
      this.processPayload(data)
    })
  },

  processPayload (payload) {
    if (Array.isArray(payload)) {
      throw new Error('payload must be of type Array')
    }
    if (payload.length == 0) {
      throw new Error('payload must contain at least 1 value')
    }

    try {
      const args = JSON.parse(payload)
      this.invoke(args[0], args.slice(1))
    } catch (err) {
      throw new Error('error parsing payload')
    }
  },

  invoke (methodName, params) {
    const method = registeredMethods[methodName]
    if (!method) {
      return
    }

    method(...params)
  }
}

class Client {
  constructor () {
    sdk.setInitialState()
    sdk.listen()
  }

  registerMethod (methodName, types, fn) {
    registeredMethods[methodName] = fn
  }

  state () {
    return state
  }

  serve () {
    const server = net.createServer(socket => {
      socket.on('data', data => {
        try {
          emitter.emit('data', data)
        } catch (err) {
          console.error(err)
        }
      })
    })

    server.listen(port, '0.0.0.0')
  }
}

module.exports = {
  Client
}
