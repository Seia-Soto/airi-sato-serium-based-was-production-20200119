const servers = {}

module.exports.servers = servers

module.exports.get = id => {
  servers[id] = servers[id] || {
    playing: false,
    queue: []
  }

  return servers[id]
}
