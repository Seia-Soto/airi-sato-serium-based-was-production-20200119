const fields = []

process.nextTick(() => {
  const commands = require('../')

  const categories = Object.keys(commands)

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const commands = Object.keys(category)

    fields[category] = {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: ''
    }

    for (let k = 0; k < commands.length; k++) {
      const command = commands[k]

      fields[category].value += `- ${command.properties.name}\n`
    }
  }
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
