# unbend

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

**Unbend** Flatten tree into an object with `{ '/complete/path/to/each': value }`

E.g. this useful for parametric http routing

## Install

    npm install --save unbend

## Usage

    unbend( Object, [ config ] )

```js
const unbend = require('unbend')

const source = {
  route: {
    inner: {
      func: () => {},
      str : 'string'
    },
    list: [ 'some data', {} ]
  },
  def: null
}

unbend( source )
```

And that will turn into

```js
const expected = {
  '/route/inner/func': () => {},
  '/route/inner/str' : 'string',
  '/route/list'      : [ 'some data', {} ],
  '/def'             : null
}
```

See [test data file](https://github.com/zerobias/unbend/blob/master/test/test-data.js) for complete examples

## Configuration

Unbend supports optional config object at second argument.

### Default config
```js
const config = {
  separator         : '/',
  skipFirstSeparator: false,
  parseArray        : false
}
```

### Custom separators

> unbend(tree, { separator: '.' })

```js
const source = {
  route: {
    inner: {
      func: () => {},
      str : 'string'
    }
  },
  def: null
}

unbend( source, { separator: '.' } )

//And that will turn into

const expected = {
  '.route.inner.func': () => {},
  '.route.inner.str' : 'string',
  '.def'             : null
}
```

### Convert nested arrays

> unbend(tree, { parseArray: true })

```js
const unbend = require('unbend')

const source = {
    list: [
        'any',
        { },
        null,
        { 'field': 'inside array' }
    ]
}

unbend( source, { parseArray: true } )

//And that will turn into

const expected = {
  '/list/0'      : 'any',
  '/list/2'      : null,
  '/list/3/field': 'inside array'
}
```

### Skip first separator

> unbend(tree, { skipFirstSeparator: true })

```js
const source = {
  route: {
    inner: {
      func: () => {},
      str : 'string'
    }
  },
  def: null
}

unbend( source, { skipFirstSeparator: true } )

//And that will turn into

const expected = {
  'route/inner/func': () => {},
  'route/inner/str' : 'string',
  'def'             : null
}
```

## License

MIT © [Zero Bias](https://github.com/zerobias)

[npm-url]: https://npmjs.org/package/unbend
[npm-image]: https://img.shields.io/npm/v/unbend.svg?style=flat-square

[travis-url]: https://travis-ci.org/zerobias/unbend
[travis-image]: https://img.shields.io/travis/zerobias/unbend.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/zerobias/unbend
[appveyor-image]: https://img.shields.io/appveyor/ci/zerobias/unbend.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/zerobias/unbend
[coveralls-image]: https://img.shields.io/coveralls/zerobias/unbend.svg?style=flat-square

[depstat-url]: https://david-dm.org/zerobias/unbend
[depstat-image]: https://david-dm.org/zerobias/unbend.svg?style=flat-square