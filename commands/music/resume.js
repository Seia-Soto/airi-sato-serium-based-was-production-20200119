module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection

  if (voiceConnection) {
    const dispatcher = voiceConnection.dispatcher

    if (dispatcher && dispatcher.paused) {
      dispatcher.resume()

      message.channel.send(opts.translations.resumed)
    } else {
      return message.channel.send(opts.translations.notPlaying)
    }
  } else {
    return message.channel.send(opts.translations.notPlaying)
  }
}

module.exports.properties = {
  name: 'resume',
  permission: 'dev'
}
