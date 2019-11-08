module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection

  if (!voiceConnection || !voiceConnection.dispatcher) {
    return message.channel.send(opts.translations.notPlaying)
  }
  if (voiceConnection.dispatcher.paused) {
    return message.channel.send(opts.translations.alreadyPaused)
  }

  voiceConnection.dispatcher.resume()
    .then(() => message.channel.send(opts.translations.paused))
}

module.exports.properties = {
  name: 'pause',
  permission: 'dev'
}
