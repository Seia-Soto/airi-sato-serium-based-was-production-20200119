const structures = require('../../structures')

module.exports.execute = (client, message, opts) => {
  const server = structures.music.servers.get(message.guild.id)

  if (server.queue.length) {
    message.channel.send(opts.translations.emptyQueue)
  } else {
    message.channel.send({
      embed: {
        title: opts.translations.queue,
        description: opts.translations.leftQueue.bind({
          left: server.queue.length - 1,
          queue: server.queue.map(video => {
            video = `[${video.title}](${video.video_url})`
          }).join('\n> ')
        })
      }
    })
  }
}

module.exports.properties = {
  name: 'queue',
  permission: 'dev'
}
