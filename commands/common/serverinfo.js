const moment = require('moment')

module.exports.execute = (client, message, opts) => {
  moment.locale(opts.translations._metadata.languageCode)

  const embed = {
    title: message.guild.name,
    description: opts.translations.description.bind({
      name: message.guild.name,
      owner: message.guild.owner.toString(),
      created: `${moment(message.guild.createdTimestamp).calendar()} (${moment(message.guild.createdTimestamp).fromNow()})`,
      // NOTE: Channels
      channelSize: message.guild.channels.size,
      textChannels: message.guild.channels.filter(channel => channel.type === 'text').size,
      voiceChannels: message.guild.channels.filter(channel => channel.type === 'voice').size || 0,
      // NOTE: Users
      userSize: message.guild.memberCount,
      bots: message.guild.members.filter(member => member.user.bot).size,
      online: message.guild.members.filter(member => member.presence.status !== 'offline').size || 0,
      playing: message.guild.members.filter(member => member.presence.game).size || 0,
      web: message.guild.members.filter(member => (member.presence.clientStatus) ? member.presence.clientStatus.web : false).size || 0,
      mobile: message.guild.members.filter(member => (member.presence.clientStatus) ? member.presence.clientStatus.mobile : false).size || 0,
      desktop: message.guild.members.filter(member => (member.presence.clientStatus) ? member.presence.clientStatus.desktop : false).size || 0,
      // NOTE: Emojis
      emojiSize: message.guild.emojis.size,
      animated: message.guild.emojis.filter(emoji => emoji.animated).size || 0,
      // NOTE: Roles
      rolesSize: message.guild.roles.size || 0
    }),
    fields: [
      {
        name: opts.translations.afkChannel,
        value: (message.guild.afkChannel)
          ? opts.translations.afkChannelName.bind({
            afkChannel: message.guild.afkChannel.name
          })
          : opts.translations.noAfkChannel
      },
      {
        name: opts.translations.afkTimeout,
        value: opts.translations.afkTimeoutStatus.bind({
          time: message.guild.afkTimeout
        })
      },
      {
        name: opts.translations.owner,
        value: message.guild.owner.toString()
      },
      {
        name: opts.translations.id,
        value: message.guild.id
      },
      {
        name: opts.translations.region,
        value: opts.translations.regions[message.guild.region]
      },
      {
        name: opts.translations.defaultMessageNotification,
        value: (message.guild.defaultMessageNotifications === 'ALL') ? opts.translations.defaultMessageNotifications.allMessages : opts.translations.defaultMessageNotifications.mentionOnly
      },
      {
        name: opts.translations.explicitContentFilter,
        value: opts.translations.explicitContentFilters[message.guild.explicitContentFilter]
      },
      {
        name: opts.translations.verificationLevel,
        value: opts.translations.verificationLevels[message.guild.verificationLevel]
      },
      {
        name: opts.translations.mfaLevel,
        value: opts.translations.mfaLevels[message.guild.mfaLevel]
      }
    ],
    thumbnail: {
      url: message.guild.iconURL
    }
  }

  return message.channel.send({ embed })
}

module.exports.properties = {
  name: 'serverinfo',
  permission: 'common'
}
