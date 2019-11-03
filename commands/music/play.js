const moment = require('moment')
const ytdl = require('ytdl-core')

const structures = require('../../structures')

module.exports.execute = async (client, message, opts) => {
  const parameter = await message.parameters.join(' ')
  const voiceChannel = await message.member.voiceChannel

  if (!voiceChannel) {
    return message.reply(opts.translations.voiceChannelMissing)
  }
  if (!parameter) {
    return message.reply(opts.translations.searchQueryMissing)
  }

  const videos = await structures.music.functions.getVideoIDs(parameter)
  const server = await structures.music.servers.get(message.guild.id)
  const voiceConnection = message.guild.voiceConnection || await voiceChannel.join()

  moment.locale(opts.translations._metadata.languageCode)
  videos.forEach(video => server.queue.push(video))

  const dispatch = async checkInactive => {
    const video = await server.queue.shift()
    const stream = await ytdl(video.video_url, {
      filter: 'audioonly'
    })

    message.channel.send({
      embed: {
        title: opts.translations.nowPlaying.title,
        description: opts.translations.nowPlaying.description.bind({
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

    server.playing = true
    server.nowplaying = video

    const dispatcher = voiceConnection.playStream(stream, {
      passes: 2,
      bitrate: 300
    })
    dispatcher.on('end', () => {
      if (server.queue.length) { // NOTE: If there is item in queue.
        return dispatch()
      } else {
        server.playing = false

        message.channel.send(opts.translations.emptyQueue)

        inactive(checkInactive)
        voiceChannel.leave()
      }
    })
  }
  const inactive = checkInactive => {
    client.clearInterval(checkInactive)
    voiceChannel.leave()

    server.playing = false
    server.queue = []
  }

  if (server.playing) {
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i]

      message.channel.send({
        embed: {
          title: opts.translations.queued.title,
          description: opts.translations.queued.description.bind({
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
    }
  } else {
    const checkInactive = setInterval(() => {
      const bot = voiceChannel.members.find(member => member.id === client.user.id)

      if (!bot || (bot && voiceChannel.members.size === 1)) {
        message.channel.send(opts.translations.inactive)

        inactive(checkInactive)
      }
    }, 1000 * 15)

    dispatch(checkInactive)
  }
}

module.exports.properties = {
  name: 'play',
  permission: 'dev'
}
