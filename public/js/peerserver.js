const PeerServer = require('peer').PeerServer;

var server = PeerServer({
    port: 9090,
    path: '/peerserver',
});

console.log("Srart PeerJS Server");
server.on("connection", (client) => {
    console.log(`Client connected: ${client.id}`);
  });
  
  server.on("disconnect", (client) => {
    console.log(`Client disconnected: ${client.id}`);
  });