const fs = require('fs')
const path = require('path')

const config = require('../../config')

module.exports = tree => {
  const found = {}
  const search = (objective, subject) => {
    if (typeof objective === 'object' && objective !== null) {
      const keys = Object.keys(objective)

      for (let i = 0; i < keys.length; i++) {
        const pathArgs = [__dirname, '..', '..', 'commands']
        pathArgs.push(...subject, keys[i])
        const commandPath = path.join.apply(null, pathArgs.map(k => String(k)))
        const isDirectory = (fs.existsSync(commandPath) && fs.lstatSync(commandPath).isDirectory())

        if (isDirectory) {
          search(objective[keys[i]], subject.concat(keys[i]))
        } else {
          console.log(`[CommandSerializer] Found new command from ${commandPath}.`)

          objective.properties.subject = subject
          objective.properties.permission = config.properties.permissions.find(permission => permission.name === objective.properties.permission)

          found[objective.properties.name] = objective

          const aliases = objective.properties.aliases || []

          aliases.forEach(alias => {
            found[alias] = objective
          })
        }
      }
    }
  }

  search(tree, [])

  return found
}
