var url = "ws://localhost:6942/";
var socket;
var roomID;
var username = "test";


//socket.send JSON containing message + chatroom number. Server relays message to all connected clients known to connect to same room.
function openTicketChat(){
    socket = new WebSocket(url);
    roomNumber = document.getElementById("ticketNumberTextBox").value;
    console.log(ticket);

    socket.onmessage = function (ev) {
        var display = document.getElementById("chatarea");
        var msg = JSON.parse(ev.data);
        display.innerHTML =  display.innerHTML + "<b>" + msg.user + "</b>:" + msg.msg + "<br>";
    };

    //JSON format: {type:<set,smsg,msg>, room:, msg:}
    socket.onopen = function () {
        socket.send(JSON.stringify({type: "set", room: roomID}));
        socket.send(JSON.stringify({type:"smsg", room: roomID, user: "SYSTEM", msg: username + " Joined chat"}));
    };

    document.getElementById("openButton").onclick = function(){};
}

function sendchat(){
    var chattext = document.getElementById("inputTextBox").textContent;
    socket.send(JSON.stringify({type:"msg",room: roomID , user: username,msg:chattext}));
    document.getElementById("inputTextBox").textContent = "";
}

