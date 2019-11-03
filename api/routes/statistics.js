const index = require('../../')

const { client } = index

module.exports = (req, res, next) => {
  res.json({
    servers: client.guild.size,
    users: client.users.size
  })
}
