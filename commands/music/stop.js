const structures = require('../../structures')

module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection

  if (voiceConnection) {
    const dispatcher = voiceConnection.dispatcher
    const server = structures.music.servers.get(message.guild.id)

    if (dispatcher) {
      voiceConnection.dispatcher.end()

      server.queue = []
      server.playing = false

      message.channel.send(opts.translations.stopped)
    } else {
      return message.channel.send(opts.translations.notPlaying)
    }
  } else {
    return message.channel.send(opts.translations.notPlaying)
  }
}

module.exports.properties = {
  name: 'stop',
  permission: 'dev'
}
