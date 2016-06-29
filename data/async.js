const data = require('./async/')

module.exports = {
  '/loan/index': data.home,
  '/preloan': data.preloan,
  '/loan/po': {
    'pro': 'haha'
  }
}
