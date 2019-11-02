const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

const structures = require('../../structures')

module.exports.execute = async (client, message, opts) => {
  const parameter = await message.parameters.join(' ')
  const voiceChannel = message.member.voiceChannel

  let videoURL = ''

  if (!voiceChannel) {
    return message.channel.send('{0: voiceChannel missing}')
  }
  if (!parameter) {
    return message.channel.send('{1: Empty String}')
  }
  if (structures.functions.validateURL(parameter)) {
    if (!ytdl.validateURL(parameter)) {
      return message.channel.send('{2:1: Invalid URL}')
    }

    videoURL = parameter
  } else {
    try {
      const searchResults = await ytsr(parameter, { limit: 5 })

      videoURL = await searchResults.items.find(item => item.type === 'video').link
    } catch (e) {
      return message.channel.send('{2:2: Fail to search video}')
    }
  }

  voiceChannel.join()
    .then(async c => {
      message.channel.send(`{e: ${videoURL}}`)

      const stream = await ytdl(videoURL, { quality: 'highestaudio', filter: 'audioonly' })
      const dispatcher = c.playStream(stream, {
        passes: 3,
        bitrate: 'auto'
      })

      dispatcher.on('end', () => {
        voiceChannel.leave()
      })
    })
}

module.exports.properties = {
  name: 'play',
  permission: 'dev'
}
