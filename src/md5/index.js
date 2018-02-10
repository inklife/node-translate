const crypto = require('crypto')

module.exports = function (str) {
  return crypto.createHash('md5').update(str.toString()).digest('hex')
}
