const R = require('ramda')
const isObject = require('./helpers').isObject
const transform = require('./transform')
const Join = require('./join')

const selectTester =
  parseArray =>
    parseArray
      ? isObject.allowArray
      : isObject.noArray


const defaultConfig = {
  parseArray        : false,
  separator         : '/',
  beginWithSeparator: true
}

const reconfig = R.ifElse(
  R.is(Object),
  R.merge(defaultConfig),
  () => defaultConfig)

const configure = basicConfig => {
  const config = reconfig(basicConfig)
  const tester = selectTester(config.parseArray)
  const join = Join(
    config.separator,
    config.beginWithSeparator)
  return transform(tester, join)
}

/**
 * Unbend nested object tree
 *
 * @param {Object} tree
 */
function unbend(tree, config) {
  const func = configure(config)
  return func(tree)
}

module.exports = unbend