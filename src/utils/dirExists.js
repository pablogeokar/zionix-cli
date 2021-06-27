const fs = require('fs')
const path = require('path')

const dirExists = (dir) => {
  let checkDir = path.join(dir)

  if (!fs.existsSync(checkDir))
    return false
  else return true
}

module.exports = dirExists