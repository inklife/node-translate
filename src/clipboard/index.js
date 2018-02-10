const path = require('path')
const { exec } = require('child_process')

const clipboard = path.join(__dirname, '../../lib/clipboard/clipboard.exe')
/**
 * @returns {Promise<{code: Number, data: String}>} Text of clipboard
 */
module.exports = function () {
  return new Promise(function (resolve) {
    exec(clipboard, function (error, stdout, stderr) {
      if (error) {
        resolve({
          code: 1,
          data: error
        })
      }
      else if (stderr === '')
        resolve({
          code: 0,
          data: stdout
        })
      else
        resolve({
          code: 1,
          data: stderr
        })
    })
  })
}
