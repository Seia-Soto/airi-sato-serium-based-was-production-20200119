module.exports = (message, filters) => {
  const mentionedMember = message.mentions.members.first()

  if (mentionedMember) {
    return mentionedMember
  } else {
    const parameter = message.parameters.join(' ').toLowerCase()
    const results = []

    if (parameter) {
      filters = filters || ['displayName']
      filters.forEach(filter => results.push(message.guild.members.find(member => (member[filter] || '').toLowerCase().includes(parameter))))

      if (results.length) {
        return results[0]
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
