const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({port: 8080})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    if (data == 'potato') {
      wss.clients.forEach((conn) => {
        if (conn != wss && conn.readyState == conn.OPEN)
          conn.send("fetch")
      })
    }
  })

})