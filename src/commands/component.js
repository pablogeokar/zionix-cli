const capitalize = require('../utils/capitalize')
const dirExists = require('../utils/dirExists')

module.exports = {
  name: 'create:component',
  alias: ['c'],
  description: 'create a react component',
  run: async toolbox => {
    const {
      parameters,
      template,
      filesystem,
      print: { success, error }
    } = toolbox
    const name = capitalize(parameters.first)

    if (!parameters.first) {
      error('specify a name for the component')
      return
    }

    const package = await filesystem.read('package.json', 'json')

    const isReactNative = !!package.dependencies['react-native']
    const isStyledComponent = !!package.dependencies['styled-components']
    const isTypescript =
      !!package.dependencies['typescript'] ||
      !!package.devDependencies['typescript']

    const styleTemplate = isReactNative
      ? 'styled-rn.js.ejs'
      : 'styled-react.js.ejs'

    const folder = dirExists('src') ? 'src/' : ''

    // Layout do componente 'MyComponent.tsx'
    await template.generate({
      template: isStyledComponent ? 'styled-component.js.ejs' : 'component.js.ejs',
      target: `${folder}components/${name}/${name}.${
        isTypescript ? 'tsx' : 'js'
      }`,
      props: { name }
    })

    // Layout da exportação do componente 'index.ts'
    await template.generate({
      template: 'index.js.ejs',
      target: `${folder}components/${name}/index.${
        isTypescript ? 'ts' : 'js'
      }`,
      props: { name }
    })

    // Layout da estilização do componente 'MyComponent.modules.css'
    await template.generate({
      template: isStyledComponent ? styleTemplate : 'cssmodules.js.ejs',
      target: isStyledComponent
        ? `${folder}components/${name}/styles.${isTypescript ? 'ts' : 'js'}`
        : `${folder}components/${name}/${name}.module.css`
    })

    success(`${folder}components/${name} successfully created!`)
  }
}
