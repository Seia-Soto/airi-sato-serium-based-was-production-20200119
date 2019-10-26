module.exports.execute = (client, message, opts) => {
  message.delete()
    .then(() => message.channel.send(message.parameters.join(' ') || opts.translations.noMessage))
    .catch(error => {
      message.channel.send(opts.translations.permissionError.bind({
        error
      }))
    })
}

module.exports.properties = {
  name: 'said',
  permission: 'common',
  aliases: ['sayd']
}
