const clipboard = require('../clipboard')
const translate = require('../translate')

let text = ''

async function service () {
  while (true) {
    const res = await clipboard()
    if (!res.code && res.data !== text) {
      text = res.data
      if (text.trim() !== '' && !/[\u4e00-\u9fa5]{2,}/.test(res.data)) {
        console.log('\033[47;30m[腾讯翻译]\033[0m')
        console.log(await translate.tencent(text))
        console.log('\033[47;30m[百度翻译]\033[0m')
        console.log(await translate.baidu(text))
        console.log('\033[47;30m[有道翻译]\033[0m')
        console.log(await translate.youdao(text))
      }
    }
    await sleep(3000)
  }
}
/**
 *
 * @param {Number} ms The number of milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

service()
