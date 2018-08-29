# c3-sdk-js

> The C3 SDK for JavaScript and NodeJS

[![License](http://img.shields.io/badge/license-MIT-blue.svg)] [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/c3systems/c3-sdk-js.svg?branch=master)](https://travis-ci.org/c3systems/c3-sdk-js)

## Usage

```js
const c3 = require('c3-sdk-js')

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
```

## Test

```bash
make test
```

## Development

```bash
make lint/fix
```

## TODO

- Use TypeScript

## License

MIT
