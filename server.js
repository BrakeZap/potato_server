const { WebSocketServer } = require("ws")
const fs = require("fs")
const wss = new WebSocketServer({port: 8080})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    fs.appendFile('logs.txt',data.toString('utf-8'), function error(err){
      if (err) {
        console.log(err)
      }
    })
    if (data.toString('utf-8') === 'potato') {
      wss.clients.forEach((conn) => {
        if (conn != wss && conn.readyState == conn.OPEN)
          conn.send("fetch")
      })
    }else {
      wss.clients.forEach((conn) => {
        if (conn != wss && conn.readyState == conn.OPEN) {
          conn.send(data)
        }
      })
    }
  })

})