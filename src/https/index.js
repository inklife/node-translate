const https = require('https')
const querystring = require('querystring')
/**
 *
 * @param {String} baseUrl URL
 * @param {Object} query Query JSON
 */
exports.get = function (baseUrl, query) {
  let url = ''
  if (isUndef(query)) {
    url = baseUrl
  } else if (isObject(query)) {
    url = baseUrl + '?' + querystring.stringify(query)
  } else {
    url = baseUrl + '?' + encodeURI(query)
  }
  return new Promise(function (resolve, reject) {
    https.get(url, function (res) {
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
    }).on('error', (e) => {
      reject(e)
    })
  })
}
/**
 *
 * @param {String} baseUrl URL
 * @param {Object} query Query JSON
 */
exports.jsonp = function (baseUrl, query) {
  const url = baseUrl + '?' + querystring.stringify(query)
  return new Promise(function (resolve, reject) {
    https.get(url, function (res) {
      let tmp = Buffer.from('')
      res.on('data', (chunk) => {
        tmp += chunk
      })
      res.on('end', function () {
        tmp = evalJSONP(tmp.toString('utf8'))
        try {
          tmp =  JSON.parse(tmp)
        } catch(e) {
          e
        } finally {
          resolve(tmp)
        }
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
}

function isUndef (v) {
  return v === undefined || v === null
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
/**
 *
 * @param {String} jsonp
 */
function evalJSONP(jsonp) {
  const l = jsonp.indexOf('{')
  const r = jsonp.lastIndexOf('}') + 1
  return jsonp.slice(l, r)
}
