const capitalize = require('../utils/capitalize')

module.exports = {
  name: 'create:page',
  alias: ['page'],
  description: 'Cria uma págnina padrão React',
  run: async toolbox => {
    const { parameters, template, filesystem, print: { success, error } } = toolbox
    const name = capitalize(parameters.first)

    if (!parameters.first) {
      error('O nome do componente não foi especificado')
      return
    }

    const package = await filesystem.read('package.json', 'json')
    const isReactNative = !!package.dependencies['react-native']
    const isTypescript = !!package.dependencies['typescript']

    const styleTemplate = isReactNative ? 'styles-rn.js.ejs' : 'styles-react.js.ejs'

    await template.generate({
      template: 'component.js.ejs',
      target: `src/pages/${name}/index.${isTypescript ? 'tsx' : 'js'}`,
      props: { name }
    })

    await template.generate({
      template: styleTemplate,
      target: `src/pages/${name}/styles.${isTypescript ? 'tsx' : 'js'}`
    })

    toolbox.print.success(`src/pages/${name} gerado com sucesso!`)
  }
}