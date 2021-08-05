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
      const info = JSON.parse(message.utf8Data);
      var username = info.Username;
      var msg = info.Message;
      var reason = info.Reason;
      var newuser = true;
      var sucessful = true;
      if(reason === "New User Request") {
        for(var i = 0; i < users.length; i++) {
          if(users[i]===username) {
            sucessful = false;
            connection.sendUTF(JSON.stringify({"Reason": "New User Request", "Status": "Denied"}))
          }
        }
        if(newuser&&sucessful) {
          users.push(username);
          connection.sendUTF(JSON.stringify({"Reason": "New User Request", "Status": "Approved"}))
          console.log(users);
        }
      } else if(reason === "Message Request") {
          if(msg.length>1) { 
            for(var i = 0; i < connections.length; i++) {
              connections[i].sendUTF(JSON.stringify({"Reason": "Message Request", "Status": "Approved", "Message": msg, "Username": username}));
            }
        }
      }
    });
});
