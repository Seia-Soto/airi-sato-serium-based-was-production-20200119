module.exports.execute = (client, message, opts) => {
  return message.channel.send(message.parameters.join(' ') || opts.translations.noMessage)
}

module.exports.properties = {
  name: 'say',
  permission: 'common'
}
