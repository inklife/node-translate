const querystring = require('querystring')
const http = require('../http')
const https = require('../https')
const md5 = require('../md5')
const sha1 = require('../sha1')
const { SecretId } = require('../sha1/config')
/**
 *
 * @param {String} words The content to be translated
 * @returns {Promise<String>} The result of translation
 */
exports.youdao = async function (words) {
  const t = Date.now()
  const salt = Date.now()
  const sign = md5('fanyideskweb' + words + salt + 'aNPG!!u6sesA>hBAW1@(-')
  const data = await http.post('http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule', {
    i: words,
    from: 'AUTO',
    to: 'AUTO',
    smartresult: 'dict',
    client: 'fanyideskweb',
    salt: salt,
    sign: sign,
    doctype: 'json',
    version: '2.1',
    keyfrom: 'fanyi.web',
    action: 'FY_BY_CLICKBUTTION',
    typoResult: 'false'
  }, {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': `OUTFOX_SEARCH_USER_ID=-1510397159@61.153.108.134; OUTFOX_SEARCH_USER_ID_NCOO=317147604.61022305; UM_distinctid=16102d6cea7101-0063b046765dc6-3c604504-144000-16102d6cea8472; fanyi-ad-id=40789; fanyi-ad-closed=1; JSESSIONID=aaahDJWQVaRaKgsrND1fw; ___rl__test__cookies=${t}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    'Origin': 'http://fanyi.youdao.com/',
    'Referer': 'http://fanyi.youdao.com/',
    'X-Requested-With': 'XMLHttpRequest'
  })
  if (!data.errorCode) {
    return data.translateResult[0][0].tgt
  }
  return '翻译失败'
}
/**
 *
 * @param {String} words The content to be translated
 * @returns {Promise<String>} The result of translation
 */
exports.tencent = async function (words) {
  const Nonce = GetRandomNum(1000, 999999)
  const t = Math.round(Date.now() / 1000)
  const baseUrl = 'tmt.api.qcloud.com/v2/index.php'
  const query = {
    'Action' : 'TextTranslate',
    'Nonce' : Nonce,
    'Region' : 'gz',
    'SecretId' : SecretId,
    'Timestamp' : t,
    'source': 'en',
    'sourceText': words,
    'target': 'zh'
  }
  const unsignedstr = `GET${baseUrl}?${querystring.unescape(querystring.stringify(query))}`
  const Signature = sha1(unsignedstr)
  const query2 = {
    'Action' : 'TextTranslate',
    'Nonce' : Nonce,
    'Region' : 'gz',
    'SecretId' : SecretId,
    'Signature': Signature,
    'Timestamp' : t,
    'source': 'en',
    'sourceText': words,
    'target': 'zh'
  }
  const data = await https.get('https://' + baseUrl, query2)
  if (!data.code) {
    return data.targetText
  }
  return '翻译失败'
}
/**
 *
 * @param {String} words The content to be translated
 * @returns {Promise<String|Array>} The result of translation
 */
exports.baidu = async function (words) {
  const res = await https.jsonp('https://sp1.baidu.com/5b11fzupBgM18t7jm9iCKT-xh_/sensearch/selecttext', {
    'cb': 'jQuery1102001061663307525218_' + Date.now(),
    'q': words,
    '_': Date.now()
  })
  if (!res.errno) {
    return res.data.result
  }
  return '翻译失败'
}
/**
 *
 * @param {Number} min Lower limit
 * @param {Number} max Upper limit
 * @returns {Number} A number beetween min and max
 */
function GetRandomNum(min, max) {
  const Range = max - min
  const Rand = Math.random()
  return (min + Math.round(Rand * Range))
}
