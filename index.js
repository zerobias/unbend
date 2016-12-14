const R = require('ramda')
const P = R.pipe

const isObject = R.both(
  R.is(Object),
  R.complement(
    R.is(Function) ) )

const isObjectNotArray = R.both(
  isObject,
  R.complement(
    R.is(Array) ) )

const join = R.join('/')

const listToProp = (way, name, acc) =>
  R.assoc(
    join( R.append(name, way) ),
    R.__,
    acc )

/**
 * @param {function(Object):boolean} tester
 * @returns {function(Object):Object}
 */
function testabletransform(tester) {
  const reducer =
    way =>
      (acc, [ name, node ]) =>
        R.ifElse(
          tester,
          reduceObject( R.append(name, way), acc ),
          listToProp(way, name, acc)
        )( node )

  const reduceObject =
    (way = [''], acc = {}) => P(
        R.toPairs,
        R.reduce(
          reducer(way),
          acc) )
  return reduceObject()
}

const reducers = {
  withArray: testabletransform(isObject),
  noArray  : testabletransform(isObjectNotArray)
}

/**
 * Unbend nested object tree
 *
 * @param {Object} object
 * @param {boolean} [parseArray = false]
 */
function unbend(object, parseArray=false) {
  const func = parseArray
    ? reducers.withArray
    : reducers.noArray
  const result = func(object)
  return result
}

module.exports = unbend