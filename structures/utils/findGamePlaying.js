module.exports = member => {
  const game = member.presence.game

  if (game) {
    let text = game.name

    if (game.url) {
      text = `[${game.name}](${game.url})`
    }

    return {
      text,
      type: game.type
    }
  } else {
    return false
  }
}
