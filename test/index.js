const R = require('ramda')
const tap = require('tap').test
const flatten = require('../index')
const data = require('./test-data')
const source = data.source

tap('Basic functional test', t => {
  const wrap = () => flatten(source)
  t.doesNotThrow(wrap, 'flatten should not fail')
  t.end()
})

tap('Flatten without arrays', t => {
  const result = flatten(source)
  const compare = R.equals(result, data.expected)
  t.equal(compare, true, 'Flatten should expected valid value')
  t.end()
})

tap('Flatten with arrays', t => {
  const result = flatten(source, true)
  const compare = R.equals(result, data.expectedWithArray)
  t.equal(compare, true, 'Flatten should expected valid value')
  t.end()
})