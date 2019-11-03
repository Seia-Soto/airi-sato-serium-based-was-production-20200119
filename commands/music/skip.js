module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection

  if (voiceConnection) {
    const dispatcher = voiceConnection.dispatcher

    if (dispatcher) {
      voiceConnection.dispatcher.end()

      message.channel.send(opts.translations.skipped)
    } else {
      return message.channel.send(opts.translations.notPlaying)
    }
  } else {
    return message.channel.send(opts.translations.notPlaying)
  }
}

module.exports.properties = {
  name: 'skip',
  permission: 'dev'
}
