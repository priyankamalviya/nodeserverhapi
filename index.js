'use strict'
const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

let goodOptions = {
  reporters: {
    console: [
      {
        module: 'good-console',
        args: [{ log: '*', response: '*' }]
      },
      'stdout'
    ]
  }
}

server.register({
  register: require('good'),
  options: goodOptions
}, err => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      server.log('error', 'Oh no!')
      server.log('info', 'replying')
      let resp = reply('hello world')
      resp.code(418)
      resp.type('text/plain')
      resp.header('hello', 'world')
      resp.state('hello', 'world')
    }
  })
  //
  // server.route({
  //   method: 'GET',
  //   path: '/{name}',
  //   handler: (request, reply) => {
  //     reply(`hello ${request.params.name}`)
  //   }
  // })

  server.start(() => console.log(`Started at: ${server.info.uri}`))

})
