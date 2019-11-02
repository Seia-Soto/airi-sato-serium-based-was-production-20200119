module.exports.execute = (client, message, opts) => {
  return message.channel.send(opts.translations.out.bind({
    length: message.parameters.join(' ').length
  }))
}

module.exports.properties = {
  name: 'length',
  permission: 'common'
}
