const moment = require('moment')

const structures = require('../../structures')

module.exports.execute = (client, message, opts) => {
  const voiceConnection = message.guild.voiceConnection
  const server = structures.music.servers.get(message.guild.id)

  moment.locale(opts.translations._metadata.languageCode)

  if (voiceConnection) {
    const video = server.queue[0]

    message.channel.send({
      embed: {
        title: opts.translations.embed.title,
        description: opts.translations.embed.description.bind({
          duration: moment.duration(video.length_seconds * 1000 /* Convert to ms */).humanize(),
          title: video.title,
          videoURL: video.video_url,
          author: video.player_response.videoDetails.author
        }),
        thumbnail: {
          url: video.player_response.videoDetails.thumbnail.thumbnails.slice(-1)[0].url
        }
      }
    })
  } else {
    return message.channel.send(opts.translations.notPlaying)
  }
}

module.exports.properties = {
  name: 'nowplaying',
  permission: 'dev',
  aliases: ['np']
}
