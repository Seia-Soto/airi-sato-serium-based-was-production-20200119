const structures = require('../../structures')

module.exports.execute = (client, message, opts) => {
  const member = structures.utils.findMember(message, ['displayName', 'nickname']) || message.member
  const embed = {
    title: opts.translations.title.bind({
      username: member.displayName
    }),
    image: {
      url: member.user.displayAvatarURL
    }
  }

  return message.channel.send({ embed })
}

module.exports.properties = {
  name: 'avatar',
  permission: 'common'
}
