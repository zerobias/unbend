const R = require('ramda')
const P = R.pipe

const utils = require('./helpers')
const sel = utils.sel


const joinTo =
  (join, way, obj) =>
    join([
      way,
      sel.name(obj) ] )

const curryJoinTo =
  func =>
    way =>
      obj =>
        joinTo(func, way, obj)

const addDrop =
  (func, separ) => P(
    func,
    R.when(
      P( R.head, R.equals(separ) ),
      //TODO Implement normal already-dropped-detection
      R.tail) )

const pipeHooks = {
  noDrop  : func => curryJoinTo(func),
  withDrop: (func, separ) => curryJoinTo( addDrop( func, separ ) )
}

const join = (separator, beginWithSeparator) => {
  const basicJoin = R.join(separator)
  const wrappedJoin = beginWithSeparator
    ? pipeHooks.noDrop(basicJoin)
    : pipeHooks.withDrop(basicJoin, separator)
  return wrappedJoin
}

module.exports = join