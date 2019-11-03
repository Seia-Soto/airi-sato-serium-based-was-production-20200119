const Discord = require('discord.js')
const restify = require('restify')

const handlers = require('./handlers')
const api = require('./api')
const config = require('./config')

String.prototype.bind = function (parameters) {
  let text = this
  const keys = text.match(/\{(.*?)\}/g)

  if (!keys) return this

  keys.forEach(key => {
    const keyname = key.replace('{', '').replace('}', '')

    text = text.replace(key, String(parameters[keyname]) || '')
  })

  return text
}

const client = new Discord.Client(config.app.client)
const server = restify.createServer({
  name: config.api.restify.name
})

const digRoutes = (routes, pathname) => {
  if (typeof routes !== 'object' && routes === null) {
    throw new Error('Group of route need to be Object.')
  }

  pathname = pathname || ''

  Object.keys(routes).forEach(route => {
    if (routes[route] && typeof routes[route] === 'object' && routes[route].constructor === Object) {
      digRoutes(routes[route], pathname + `/api/${route}`)
    } else {
      server.get(pathname + `/api/${route}`, routes[route])

      console.log(`[API] GET: ${pathname + `/api/${route}`}`)
    }
  })
}

client.once('ready', () => {
  console.log(`[Client] Logged in as ${client.user.tag}`)

  client.on('message', handlers.message.bind(null, client))
})

client.login(config.app.token)

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.dateParser(59))
server.use(restify.plugins.queryParser(config.api.restify.plugins.queryParser))
server.use(restify.plugins.jsonp())
server.use(restify.plugins.bodyParser(config.api.restify.plugins.bodyParser))
server.use(restify.plugins.gzipResponse())

digRoutes(api.routes)

server.listen(config.api.restify.host.port, () => {
  console.log(`[API] Listening from the port ${config.api.restify.host.port}`)
})

module.exports = {
  client, server, config
}
