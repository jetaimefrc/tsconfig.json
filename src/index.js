const inquirer = require('inquirer')
const { writeFileSync } = require('fs')

const tsconfigs = {
  react: JSON.stringify(require('./config/tsconfig.react.json'), null, 2),
  'react-native': JSON.stringify(
    require('./config/tsconfig.react-native.json'),
    null,
    2,
  ),
  node: JSON.stringify(require('./config/tsconfig.react-native.json'), null, 2),
}
const tsLint = JSON.stringify(require('./config/tslint.json', null, 2))

inquirer
  .prompt([
    {
      type: 'list',
      message: "Pick the framework you're using:",
      name: 'framework',
      choices: ['react', 'react-native', 'node'],
    },
  ])
  .then(({ framework }) => {
    const tsconfigToWrite = tsconfigs[framework]
    const tsLintToWrite = tsLint
    const cwd = process.cwd()
    writeFileSync(cwd + '/tsconfig.json', tsconfigToWrite)
    writeFileSync(cwd + '/tslint.json', tsLintToWrite)

    console.log('tsconfig.json and tslint.json successfully created')
  })
