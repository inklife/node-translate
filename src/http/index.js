const http = require('http')
const URL = require('url')
const querystring = require('querystring')
/**
 *
 * @param {String} url URL
 * @param {Object} data Post Data(JSON)
 * @param {Object} headers Customized Headers(JSON)
 */
exports.post =  function (url, data, headers) {
  const parsedURL = URL.parse(url)
  const postData = querystring.stringify(data)
  let options = {
    hostname: parsedURL.hostname,
    port: parsedURL.port || 80,
    path: parsedURL.path,
    method: 'POST',
    headers: {
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  headers && Object.assign(options.headers, headers)
  return new Promise(function (resolve, reject) {
    const req = http.request(options, function (res) {
      let tmp = Buffer.from('')
      res.on('data', (chunk) => {
        tmp += chunk
      })
      res.on('end', function () {
        tmp = tmp.toString('utf8')
        try {
          tmp = JSON.parse(tmp)
        } catch(e) {
          e
        } finally {
          resolve(tmp)
        }
      })
    })
    req.on('error', function (error) {
      reject(error)
    })
    req.write(postData)
    req.end()
  })
}
/**
 *
 * @param {String} url URL
 * @param {Object} headers Customized Headers(JSON)
 */
exports.get = function (url, headers) {
  const parsedURL = URL.parse(url)
  let options = {
    hostname: parsedURL.hostname,
    port: parsedURL.port || 80,
    path: parsedURL.path,
    method: 'GET',
    headers: {}
  }
  headers && Object.assign(options.headers, headers)
  return new Promise(function (resolve, reject) {
    const req = http.request(options, function (res) {
      let tmp = Buffer.from('')
      res.on('data', (chunk) => {
        tmp += chunk
      })
      res.on('end', function () {
        tmp = tmp.toString('utf8')
        try {
          tmp = JSON.parse(tmp)
        } catch(e) {
          e
        } finally {
          resolve(tmp)
        }
      })
    })
    req.on('error', function (error) {
      reject(error)
    })
    req.end()
  })
}
