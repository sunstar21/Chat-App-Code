const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(3000);
const wsServer = new WebSocketServer({
    httpServer: server
});
var connections = [];
var users = [];
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connections.push(connection)
    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      const info = JSON.parse(message.utf8Data);
      var username = info.Username;
      console.log(username);
      var msg = info.Message;
      console.log(msg)
      var reason = info.Reason;
      var newuser = true;
      if(reason === "New User Request") {
        for(var i = 0; i < users.length; i++) {
          if(users[i]===username) {
            connection.sendUTF("Already Exists")
          }
        }
        if(newuser) {
          users.push(username);
          connection.sendUTF("Approved")
          console.log(users);
        }
      } else if(reason === "Message Request") {
          for(var i = 0; i < connections.length; i++) {
            connecitons[i].sendUTF(msg);
          }
      }
    });
});
