const capitalize = require('../utils/capitalize')
const dirExists = require('../utils/dirExists')

module.exports = {
  name: 'create:page',
  alias: ['page'],
  description: 'Create a react page',
  run: async toolbox => {
    const { parameters, template, filesystem, print: { success, error } } = toolbox
    const name = capitalize(parameters.first)

    if (!parameters.first) {
      error('specify a name for the component')
      return
    }

    const package = await filesystem.read('package.json', 'json')
    const isReactNative = !!package.dependencies['react-native']
    const isTypescript = !!package.dependencies['typescript'] || !!package.devDependencies['typescript']

    const styleTemplate = isReactNative ? 'styled-rn.js.ejs' : 'styled-react.js.ejs'
    const folder = dirExists('src') ? 'src/' : ''

    await template.generate({
      template: 'component.js.ejs',
      target: `${folder}pages/${name}/${name}.${isTypescript ? 'tsx' : 'js'}`,
      props: { name }
    })

    await template.generate({
      template: styleTemplate,
      target: `${folder}pages/${name}/styles.${isTypescript ? 'tsx' : 'js'}`
    })

    success(`${folder}pages/${name} successfully created!`)
  }
}