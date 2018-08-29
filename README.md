# c3-sdk-js

> The [C3](https://github.com/c3systems/c3-go) SDK for NodeJS

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/c3systems/c3-sdk-js/master/LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/c3systems/c3-sdk-js.svg?branch=master)](https://travis-ci.org/c3systems/c3-sdk-js)
[![Coverage Status](https://coveralls.io/repos/github/c3systems/c3-sdk-js/badge.svg?branch=master)](https://coveralls.io/github/c3systems/c3-sdk-go?branch=master)

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

Lint

```bash
make lint/fix
```

## TODO

- Tests
- Use TypeScript

## License

MIT
