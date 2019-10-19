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
    if (command.properties.name === commandName) {
      fields[categoryIndex].value += `- ${command.properties.name}\n`
    }
  })
})

module.exports.execute = (client, message, opts) => {
  message.channel.send({
    embed: {
      title: opts.translations.title,
      fields
    }
  })
}

module.exports.properties = {
  name: 'help',
  permission: 'dev',
  aliases: ['h']
}
