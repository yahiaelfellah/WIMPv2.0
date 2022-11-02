const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const port = 8888

const httpServer = createServer(aedes, { ws: true })

httpServer.listen(port, function () {
  console.log('websocket server listening on port ', port)
})