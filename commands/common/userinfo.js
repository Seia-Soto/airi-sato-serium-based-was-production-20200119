const moment = require('moment')

const structures = require('../../structures')

module.exports.execute = (client, message, opts) => {
  moment.locale(opts.translations._metadata.languageCode)

  const member = structures.utils.findMember(message, ['displayName', 'nickname']) || message.member
  const game = structures.utils.findGamePlaying(member)

  const embed = {
    title: member.user.tag,
    description: opts.translations.description.bind({
      username: member.toString(),
      joined: `${moment(member.joinedTimestamp).calendar()} (${moment(member.joinedTimestamp).fromNow()})`,
      displayAvatarURL: member.user.displayAvatarURL
    }),
    thumbnail: {
      url: member.user.displayAvatarURL
    },
    fields: [
      {
        name: opts.translations.tag,
        value: member.user.tag
      },
      {
        name: opts.translations.nickname,
        value: member.nickname || opts.translations.noNickname
      },
      {
        name: 'ID',
        value: member.user.id
      },
      {
        name: opts.translations.createdTimestamp,
        value: `${moment(member.user.createdAt).calendar()} (${moment(member.user.createdAt).fromNow()})`
      },
      {
        name: opts.translations.displayColor,
        value: member.displayHexColor
      },
      {
        name: opts.translations.highestRole,
        value: (member.highestRole || {}).name || opts.translations.noRole
      },
      {
        name: opts.translations.status,
        value: opts.translations[member.presence.status]
      },
      {
        name: opts.translations.muted[0],
        value: opts.translations.muted[Number(member.serverMute) + 1] // NOTE: True(2), False(1), Name(0)
      },
      {
        name: opts.translations.deafen[0],
        value: opts.translations.deafen[Number(member.deaf) + 1] // NOTE: True(2), False(1), Name(0)
      },
      {
        name: opts.translations.game,
        value: (game) ? opts.translations.gameMessage.bind({
          name: game.text,
          type: opts.translations.gameType[game.type || 'PLAYING']
        }) : opts.translations.notPlaying
      },
      {
        name: opts.translations.roles,
        value: member.roles.map(role => role.name).join(', ')
      }
    ]
  }
  embed.fields.forEach(field => {
    field.inline = true
  })

  return message.channel.send({ embed })
}

module.exports.properties = {
  name: 'userinfo',
  permission: 'common'
}
