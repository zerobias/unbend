const R = require('ramda')
const tap = require('tap').test
const flatten = require('../index')
const { source, expected } = require('./test-data')


tap('Basic functional test', t => {
  let result
  const wrap = () => result = flatten(source)
  t.doesNotThrow(wrap, 'flatten should not fail')
  const compare = R.equals(result, expected)
  t.equal(compare, true, 'Flatten shoul return valid value')
  t.end()
})