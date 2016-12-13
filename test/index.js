const R = require('ramda')
const tap = require('tap').test
const flatten = require('../index')
const { source, expected, expectedWithArray } = require('./test-data')


tap('Basic functional test', t => {
  const wrap = () => flatten(source)
  t.doesNotThrow(wrap, 'flatten should not fail')
  t.end()
})

tap('Flatten without arrays', t => {
  const result = flatten(source)
  const compare = R.equals(result, expected)
  t.equal(compare, true, 'Flatten should expected valid value')
  t.end()
})

tap('Flatten with arrays', t => {
  const result = flatten(source, true)
  const compare = R.equals(result, expectedWithArray)
  t.equal(compare, true, 'Flatten should expected valid value')
  t.end()
})