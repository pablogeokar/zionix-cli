const command = {
  name: 'zionix',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Zionix Tecnologia - CLI para auxilio de tarefas comuns no ambiente de desenvolvimento')
  }
}

module.exports = command
