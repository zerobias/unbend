const vals = {
  func  : () => {},
  string: 'string',
  list  : [ 'any', {}, null ],
  nil   : null
}

const source = {
  route: {
    inner: {
      func: vals.func,
      str : vals.string
    },
    list: vals.list
  },
  def: vals.nil
}

const expected = {
  '/route/inner/func': vals.func,
  '/route/inner/str' : vals.string,
  '/route/list'      : vals.list,
  '/def'             : vals.nil
}

module.exports = { source, expected }