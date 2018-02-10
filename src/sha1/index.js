const crypto = require('crypto')
const secret = require('./config').SecretKey

module.exports = function (str) {
  return crypto.createHmac('sha1', secret).update(str.toString()).digest('base64')
}
