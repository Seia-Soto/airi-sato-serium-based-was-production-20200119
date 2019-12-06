const ytdl = require('ytdl-core') // NOTE: YouTube video parser.
const ytsr = require('ytsr') // NOTE: YouTube search result parser.
const ytpl = require('ytpl') // NOTE: Playlist parser.

const structures = require('../../../structures')

const getInfo = async url => {
  try {
    const info = await ytdl.getInfo(url)

    return info
  } catch (error) {
    return { error }
  }
}

module.exports = async text => {
  text = text || ''

  const videos = []

  if (!text) {
    return videos
  }

  if (structures.functions.validateURL(text)) { // NOTE: If the text is URL.
    if (ytpl.validateURL(text)) { // NOTE: If the video URL is refering a playlist.
      const playlist = await ytpl(text)

      for (let i = 0; i < playlist.items.length; i++) {
        const videoInfo = await getInfo(playlist.items[i].url_simple)

        videos.push(videoInfo)
      }

      return videos
    } else if (ytdl.validateURL(text)) { // NOTE: If the video URL is refering a video.
      const videoInfo = await getInfo(text)

      videos.push(videoInfo)

      return videos
    }
  } else { // NOTE: Use `else` to prevent running common search if the text is URL.
    const searchResults = await ytsr(text, { limit: 10 })
    const videoLink = await searchResults.items.find(item => item.type === 'video').link
    const videoInfo = await getInfo(videoLink)

    videos.push(videoInfo)

    return videos
  }

  return videos
}
