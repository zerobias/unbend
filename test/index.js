const tap = require('tap').test
const flatten = require('../src/index')
const data = require('./test-data')
const source = data.source

tap('Basic functional test', t => {
  const wrap = () => flatten(source)
  t.doesNotThrow(wrap, 'flatten should not fail')
  t.end()
})

tap('Flatten without arrays', t => {
  const result = flatten(source)
  t.same(result, data.expected, 'Default parse match fail')
  t.end()
})

tap('Flatten with arrays', t => {
  const config = { parseArray: true }
  const result = flatten(source, config)
  t.same(result, data.expectedWithArray, 'Parse arrays match fail')
  t.end()
})

tap('Custom separator', t => {
  const config = { separator: '.' }
  const result = flatten(source, config)
  t.same(result, data.expectedSeparator, 'Custom separator match fail')
  t.end()
})

tap('No separator at begin', t => {
  const config = {
    separator         : '.',
    skipFirstSeparator: true
  }
  const result = flatten(source, config)
  t.same(result, data.expectedNoBegin, 'No separator at begin match fail')
  t.end()
})