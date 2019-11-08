module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection

  if (!voiceConnection || !voiceConnection.dispatcher) {
    return message.channel.send(opts.translations.notPlaying)
  }
  if (!voiceConnection.dispatcher.paused) {
    return message.channel.send(opts.translations.alreadyPlaying)
  }

  voiceConnection.dispatcher.resume()
    .then(() => message.channel.send(opts.translations.resumed))
}

module.exports.properties = {
  name: 'resume',
  permission: 'dev'
}
