const R = require('ramda')

const isObj = R.both(
  R.is(Object),
  R.complement(
    R.is(Function) ) )

const isObjectNotArray = R.both(
  isObj,
  R.complement(
    R.is(Array) ) )

const isObject = {
  allowArray: isObj,
  noArray   : isObjectNotArray
}



const sel = {
  name: R.prop(0),
  node: R.prop(1)
}

module.exports = { isObject, sel }