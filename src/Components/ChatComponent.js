import React from 'react';
import ChatInput from './ChatInput';
import ChatMessageDisplay from './ChatMessageDisplay';

class ChatComponent extends React.Component {

    websocket = new WebSocket("ws://localhost:42069/");
    state = {
        Username: "",
        isAdmin: false,
        active_rooms: [], //(Array| String)
        current_room: "",
        cur_room_idx: 0,
        messagesByRoom: new Map(), //(String) room --> (Array| JSON) Messages
        websocket: null
    };

    constructor(props){ //Properties should include at minimum Username and isAdmin
        super(props);
        this.state.Username = props.username;
        this.state.isAdmin = (props.isAdmin === "true");
        this.websocket.onmessage = this.onWSMessage;
        this.websocket.onopen = this.onWSOpen;
    }

    onWSOpen = () => {
        if(!this.state.isAdmin){ //Not admin -> gets their own room. Set current room as well
                this.websocket.send(JSON.stringify({
                type: "register",
                room: this.state.Username,
                user: this.state.Username,
                isadmin: false
            })); //Expect a receipt JSON from server.
            this.state.messagesByRoom.set(this.state.Username,[]);
            this.setState({current_room: this.state.Username});
        }else{
            this.websocket.send(JSON.stringify({
                type: "register",
                room: this.state.Username,
                user: this.state.Username,
                isadmin: true
            })); //Expect a receipt JSON from server if admin is assigned a room.
        }
    };

    onWSMessage = (ev) => {
        var msg = JSON.parse(ev.data);// {type:<register,smsg,msg,receipt,reload>, room:, user:, msg:}
        switch (msg.type) {
            case "smsg":
            case "msg":{
                var room = msg.room;
                var messages_By_Room = this.state.messagesByRoom;
                var room_messages = messages_By_Room.get(room);
                room_messages.push(msg);
                messages_By_Room.set(room,room_messages);
                this.setState({messagesByRoom: messages_By_Room});
                break;
            }
            case "receipt":{
                var activerooms = this.state.active_rooms;
                var newroom = msg.room;
                activerooms.push(newroom);
                this.setState({active_rooms:activerooms});
            }
        }
    };

    WSSendChat = (txt) => {
        if(this.state === null){
            return;
        }
        this.websocket.send(JSON.stringify({type:"msg",room: this.state.current_room , user: this.state.Username, msg:txt}))
    };

    onCycleRoom = () => {
        this.setState(
            {cur_room_idx: this.state.cur_room_idx + 1,
                current_room: this.state.active_rooms[this.state.cur_room_idx +1]
            });
    };

    render(){
        var messages = this.state.messagesByRoom.get(this.state.current_room);
        if(messages === undefined || messages == null){
            messages = [];
        }
        return(
            <div>
                <ChatMessageDisplay messages = {messages}/>
                <ChatInput onSend = {this.WSSendChat}/>
            </div>
        )
    }

}

export default ChatComponent;
