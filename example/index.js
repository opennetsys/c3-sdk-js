const c3 = require('../index')

const client = new c3.Client()

class App {
  setItem (key, value) {
    client.state().set(Buffer.from(key), Buffer.from(value))
  }

  getItem (key) {
    const { value, found } = client.state().get(Buffer.from(key))
    if (!found) {
      return ''
    }

    return value.toString()
  }
}

function main () {
  console.log('running')

  const app = new App()
  client.registerMethod('setItem', ['string', 'string'], app.setItem)
  client.registerMethod('getItem', ['string'], app.getItem)
  client.serve()
}

main()
