var webSocketServer = require('ws').Server;
var PORT = 6942;
var wss = new webSocketServer({port:PORT});
var roommap = new Map();


wss.on('connection', function (ws) { //ws is a WebSocket object representing the new connection
    //send all previous messages to connected clients.
    console.log('Connection established.');

    ws.on('message', function (message) {
        console.log('Message Received: %s', message);
        var mjson = JSON.parse(message);
        var roomclients = roommap.get(mjson.room);
        if(roomclients === undefined){ roomclients = []; }
        if(mjson.type === "set"){
            roomclients.push(ws);
            roommap.set(mjson.room,roomclients);
        }else if(mjson.type === "smsg" || mjson.type === "msg") {
            roomclients.forEach(function (cl) {
                cl.send(message);
            });
        }else{
            console.log('Unrecognized WS message type.')
        }
        //wss.clients.forEach(function (conn) {
        //    conn.send(message);
        //});
    });
});


