const command = {
  name: 'zionix',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Zionix Tec - CLI to help with common tasks in the development environment')
  }
}

module.exports = command
