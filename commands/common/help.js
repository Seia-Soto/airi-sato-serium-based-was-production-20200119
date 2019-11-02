const structures = require('../../structures')

const fields = []

process.nextTick(() => {
  const commands = require('../')

  Object.keys(commands).forEach(commandName => {
    const command = commands[commandName]

    let categoryIndex = fields.findIndex(field => field.name === structures.functions.uppercaseFirstChar(command.properties.category))

    if (categoryIndex < 0) {
      fields.push({
        name: structures.functions.uppercaseFirstChar(command.properties.category),
        value: ''
      })

      categoryIndex = fields.length - 1
    }
    if (!fields[categoryIndex].value.includes(command.properties.name /* Original name */)) {
      fields[categoryIndex].value += '`' + commandName + '` '
    }
  })
})

module.exports.execute = (client, message, opts) => {
  message.channel.send({
    embed: {
      title: opts.translations.title,
      description: opts.translations.description,
      fields
    }
  })
}

module.exports.properties = {
  name: 'help',
  permission: 'common',
  aliases: ['h']
}
