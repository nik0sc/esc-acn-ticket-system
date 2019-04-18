var webSocketServer = require('ws').Server;
var PORT = 42069;
var wss = new webSocketServer({port:PORT});
var roommap = new Map(); //Map from client room to list of references to clients in the room.
var clientmap = new Map(); //Map from client WS object to array containing the set of rooms this client is active in.
var admins = []; //Array of admins (subset of clients)
var clientqueue = []; //Queue of unserviced clients

var xorshiftstate = 343112;

class Room {
    Messages = [];
    participants = [];
}


wss.on('connection', function (ws) { //ws is a WebSocket object representing the new connection. Different ws objects can have same
    console.log('Connection established.');

    ws.on('message', function (message) {
        console.log('Received: %s', message);
        var mjson = JSON.parse(message);
        var roomclients = roommap.get(mjson.room);
        if(roomclients === undefined){ roomclients = []; }

        if(mjson.type === "register"){
            roomclients.push(ws);
            var clientrooms = clientmap.get(ws);
            if (clientrooms === undefined)
                clientrooms = [];
            if(mjson.isadmin === false){
                roommap.set(mjson.room, roomclients); //Only actually create a room if this is a client client. Admins do not have their own rooms.
                clientrooms.push(mjson.room);//And also record that client is added to his own room
            }
            clientmap.set(ws, clientrooms);

            if(mjson.isadmin === true){ //Admin registered. Pick a queued client and add this admin to their room.
                admins.push(ws);
                if(clientqueue.length !== 0){
                    var luckyclientroomid = clientqueue.pop(); //The actual object popped is a string, the name of the room.
                    var luckyclientroom = roommap.get(luckyclientroomid);
                    luckyclientroom.push(ws); //Add the admin here.
                    roommap.set(luckyclientroomid,luckyclientroom);
                    clientrooms.push(luckyclientroomid);
                    clientmap.set(ws,clientrooms);
                    ws.send(JSON.stringify({type: "receipt", room: luckyclientroomid})); //Got to tell admin's clientside js to change room.
                }
            }else { //Client registered. Pick a random admin and add them to client's room. Or add client to a queue to wait.
                //Get random admin.
                if(admins.length !== 0){
                    var fates_chosen = admins[xrsrng(admins.length)];
                    roomclients.push(fates_chosen); //(new) Client room list of participants still exists. Push the admin and set again.
                    roommap.set(mjson.room,roomclients);
                    var chosens_rooms = clientmap.get(fates_chosen);
                    chosens_rooms.push(mjson.room);
                    clientmap.set(fates_chosen,chosens_rooms);
                    fates_chosen.send(JSON.stringify({type: "receipt", room: mjson.room})); //Got to tell admin's clientside js to change room.
                }else{
                    clientqueue.push(mjson.room);
                }
            }

        }
        else if(mjson.type === "smsg" || mjson.type === "msg") {
            roomclients.forEach(function (cl) {
                //if(cl.stat)
                cl.send(message);
            });
        }
        else{
            console.log('Unrecognized WS message type.')
        }
    });

    ws.on('close', function (){
        var clientrooms = clientmap.get(ws);
        console.log(clientrooms);
        if(clientrooms !== undefined) {
            clientrooms.forEach(function (room) {
                var roomclients = roommap.get(room);
                var mutated = roomclients.filter(function (v) {
                    return v !== ws;
                });
                roommap.set(room, mutated);
            });
        }
        if(admins.includes(ws)){
            console.log("An admin has vanished")
            admins = admins.filter(function(v){return v !== ws;}); //Delete the admin
            clientrooms.forEach(function (room) {
                clientqueue.push(room);
            });
        }else{
            console.log("A client has departed");
        }

    });
});

function registerClient(ws){

}

function registerAdmin(ws){

}

function xrsrng(bound){
    xorshiftstate ^= xorshiftstate <<13;
    xorshiftstate ^= xorshiftstate >>17;
    xorshiftstate ^= xorshiftstate <<5;
    return xorshiftstate%bound;
}
