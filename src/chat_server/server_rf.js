var webSocketServer = require('ws').Server;
var PORT = 42069;
var wss = new webSocketServer({port:PORT});

var admins = [];
var nonAdmins = [];
var rooms = [];

var wsMap = new Map(); // websocket -> User
var roomidMap = new Map(); // (int) roomid -> Room

//var xorshiftstate = 343112;
var newroomid = 0;

class Room {
    //Pre-condition: svc_client is the username of the non-admin client in this room.
    //Post-condition: servicedClient stores the username.
    constructor(svc_client){
        this.roomId = newroomid++; //Overflow is not expected to be an issue
        this.servicedClient = svc_client;
        this.roomMessages = []; //(Array of JSON messages)
        this.participants = []; //(Array of User)
    }
}

class User {
    //Pre-conditions: ws is a (reference to) websocket object. username is a string. isAdmin is a boolean.
    //Post-condition: A new User is created with its webSocket connection and username defined.
    constructor(ws,username,isAdmin){
        this.webSocket = ws;
        this.username = username;
        this.isAdmin = isAdmin;
        this.activeRooms = [];
    }
}

wss.on('connection', function (ws) { //ws is a WebSocket object representing the new connection. Different ws objects can have same
    console.log('Connection established.');

    ws.on('message', function (message) {
        console.log('Received: %s', message);
        var mjson = JSON.parse(message);

        if(mjson.type === "register"){
            if(mjson.isAdmin){
                registerAdmin(ws,mjson);
            }else{ registerClient(ws,mjson); }
        }
        else if(mjson.type === "smsg" || mjson.type === "msg") {
            var targetRoomId = mjson.room;
            var targetRoom = roomidMap.get(targetRoomId);
            if(targetRoom !== undefined) {
                targetRoom.roomMessages.push(mjson);
                targetRoom.participants.forEach(function (user) {
                    if (user.webSocket.readyState !== 3) //One last check to ensure the socket is NOT closed.
                        user.webSocket.send(message);
                });
            }
        }
        else{
            console.log('Unrecognized WS message type.')
        }
    });

    ws.on('close', function (){
        var departingUser = wsMap.get(ws);
        if(departingUser.isAdmin){
            departingUser.activeRooms.forEach(function (room) {
                var filteredParticipants = room.participants.filter(function(v){
                    return v !== departingUser;
                });
                room.participants = filteredParticipants;
            });
            console.log("An admin has left");
            admins = admins.filter(function(v){
                return v !== departingUser;
            });
        }else{
            console.log("handling non admin departure");
            handleNonAdminClose(departingUser);
       
        }

    });
});

function registerClient(ws,message){ //Registering a new client constructs a new room for that client and adds all admins to the room.
    var newUser = new User(ws,message.user,false);
    wsMap.set(ws,newUser);
    var newRoom = new Room(newUser);
    roomidMap.set(newRoom.roomId,newRoom);
    newRoom.participants.push(newUser);
    newUser.activeRooms.push(newRoom);
    admins.forEach(function (adminUser) {
        newRoom.participants.push(adminUser);
        sendReceipt(adminUser,newRoom);
    });
    rooms.push(newRoom);
    nonAdmins.push(newUser);
    //ws.send(JSON.stringify({type: "receipt", room: {newRoom.roomId}));
    // var receipt = sendReceipt(newUser,newRoom);
    // console.log("Delivered receipt: %s", receipt);
    sendReceipt(newUser, newRoom);
}

function registerAdmin(ws,message){ //Registering a new admin adds said admin to all currently open rooms.
    var newAdminUser = new User(ws,message.user,true);
    wsMap.set(ws,newAdminUser);
    admins.push(newAdminUser);
    console.log(rooms);
    rooms.forEach(function (room) {
        room.participants.push(newAdminUser);
        sendReceipt(newAdminUser,room);
    });
}

//TODO: Send some message to admins so they know that the room is closed and is no longer being served
function handleNonAdminClose(departingUser){
    var toClose = departingUser.activeRooms.pop(); //Non admins will only have one entry.
    console.log(toClose.participants);
    toClose.participants.forEach(function (user) {
        if (user !== departingUser){ //These are the admins, remove their references to this room.
            user.activeRooms = user.activeRooms.filter(function (v) {
                return v !== toClose;
            });
            if(user.webSocket.readyState !== 3) user.webSocket.send(JSON.stringify({type: "eviction", room:toClose.roomId}));
            console.log("Delivered eviction notice");
        }
    });
    toClose.participants = [];
    rooms = rooms.filter(function (v) {
        return v!==toClose;
    });
    nonAdmins = nonAdmins.filter(function (v) {
        return v !== departingUser;
    });
}

function sendReceipt(tar_user, r_room ){
    var receiptJSONstring = JSON.stringify({type: "receipt", room:{roomId: r_room.roomId, name: r_room.servicedClient.username} });
    tar_user.webSocket.send(receiptJSONstring);
    console.log("Delivered receipt: %s", receiptJSONstring);
    return receiptJSONstring;
}

/*
function xrsrng(bound){
    xorshiftstate ^= xorshiftstate <<13;
    xorshiftstate ^= xorshiftstate >>17;
    xorshiftstate ^= xorshiftstate <<5;
    return xorshiftstate%bound;
}
*/
