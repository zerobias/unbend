const R = require('ramda')
const P = R.pipe
const Injector = require('./injector')

const traverse = walker => (acc, obj) => walker(obj.way, acc, obj.node)
const convolve = (acc, obj) => R.assoc( obj.way, obj.node, acc )

const recomposer =
  either =>
    (acc, obj) =>
      either(obj.node)(acc, obj)

const nodeParser = (either, injector) => {
  const recompose = recomposer(either)
  return (way, acc, level) => {
    const levelReducer = injector(way, recompose)
    const levelPipe = P( R.toPairs, R.reduce(levelReducer, acc) )
    return levelPipe(level)
  }
}

const Walker = (testFunc, join) => {

  const either =
    node =>
      testFunc(node)
        ? NodeMethods.traverse
        : NodeMethods.convolve

  const injector = Injector(join)

  const parser = nodeParser(either, injector)

  const NodeMethods = {
    traverse: traverse(parser),
    convolve: convolve,
  }

  return parser
}

const treeWalk = (tester, join) => {

  const eitherRed = Walker(tester, join)
  return tree => eitherRed('', {}, tree)
}

module.exports = treeWalk