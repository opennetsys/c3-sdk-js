const fs = require('fs')
const net = require('net')
const EventEmitter = require('events')
const ee = new EventEmitter()

const port = process.env.PORT || 3330
const registeredMethods = {}

const store = {}
const state = {
  set: (key, value) => {
    store[key.toString('hex')] = value.toString('hex')
    fs.writeFileSync(sdk.statefile, JSON.stringify(store))
  },
  get: (key) => {
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
      const s = JSON.parse(initialState)
      for (let k in s) {
        store[k] = s[k]
      }
    }
  },

  listen () {
    ee.on('data', (data) => {
      this.processPayload(data)
    })
  },

  processPayload (payload) {
    const args = JSON.parse(payload)
    this.invoke(args[0], args.slice(1))
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
    ;(() => {
      sdk.listen()
    })()
  }

  registerMethod (methodName, types, fn) {
    registeredMethods[methodName] = fn
  }

  state () {
    return state
  }

  serve () {
    var server = net.createServer(function (socket) {
      socket.on('data', x => {
        try {
          ee.emit('data', x)
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
