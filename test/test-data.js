const vals = {
  func  : () => {},
  string: 'string',
  nil   : null,
  list  : [
    'any',
    {
      'field': 'inside array'
    },
    { },
    null ],
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

const expectedWithArray = {
  '/route/inner/func'  : vals.func,
  '/route/inner/str'   : vals.string,
  '/route/list/0'      : 'any',
  '/route/list/1/field': 'inside array',
  '/route/list/3'      : vals.nil,
  '/def'               : vals.nil
}

module.exports = { source, expected, expectedWithArray }