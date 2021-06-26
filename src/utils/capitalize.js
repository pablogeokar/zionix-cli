const capitalize = str => {
  if (typeof str === 'string') {
    return str.replace(/^\w/, c => c.toUpperCase())
  } else {
    return ''
  }
}

module.exports = capitalize