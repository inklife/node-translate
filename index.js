const fs = require('fs')
const path = require('path')

const apiConfig = path.join(__dirname, '/src/sha1/config.js')
const fakeConfig = `
/**
 * Please go to 'https://cloud.tencent.com/product/api' for a Tencent Cloud API.
 * Don't worry, it's easy and free.
 */

module.exports = {
  SecretId: '------------------------------------',
  SecretKey: '--------------------------------'
}
`

if (!fs.existsSync(apiConfig)) {
  console.log('We have detected that your Tencent Cloud API has not been configured.\nPlease configure it and modify the fake configuration file in time.')
  fs.writeFileSync(apiConfig, fakeConfig, 'utf8')
}

require('./src/service')
