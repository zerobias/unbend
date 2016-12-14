const R = require('ramda')
// const P = R.pipe
const utils = require('./helpers')
const sel = utils.sel




const wayNodeMerge = (way, node) => ({ way, node })

const valWayNode = join => val =>
    wayNodeMerge(
      join(val),
      sel.node(val) )

const injector =
  join =>
    (way, reduce) => {
      const joiner = join(way)
      const valConvert = valWayNode(joiner)
      return (acc, val) => reduce( acc, valConvert(val) )
    }
module.exports = injector