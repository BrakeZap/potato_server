const { WebSocketServer } = require("ws")
const wss = new WebSocketServer({port: 8080})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log(data.toString('utf-8'))
    if (data.toString('utf-8') === 'potato') {
      wss.clients.forEach((conn) => {
        if (conn != wss && conn.readyState == conn.OPEN)
          conn.send("fetch")
      })
    }else {
      wss.clients.forEach((conn) => {
        if (conn != wss && conn.readyState == conn.OPEN) {
          conn.send(data.toString('utf-8'))
        }
      })
    }
  })

})