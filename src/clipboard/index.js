const { exec } = require('child_process')
const os = require('os')
const type = os.type().toLocaleLowerCase()

let clipboard = ''

if (type === 'windows_nt') {
  clipboard = 'powershell clipboard'
} else if (type === 'darwin') {
 clipboard = 'pbpaste'
} else {
  throw new Error('For the time being, only Windows and MacOS are supported.')
}

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
