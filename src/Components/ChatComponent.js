import React from 'react';
import ChatInput from './ChatInput';
import ChatMessageDisplay from './ChatMessageDisplay';
import ChatSelector from './ChatSelector';
import Grid from '@material-ui/core/Grid';

class ChatComponent extends React.Component {

    websocket = new WebSocket("ws://localhost:42069/");
    state = {
        Username: "",
        isAdmin: false,
        active_rooms: [], //(Array| {int,String}) {roomId, name}
        current_room: -1,
        //cur_room_idx: 0,
        messagesByRoom: new Map(), //(int) roomId --> (Array| JSON) Messages
        notificationState: new Map() //(int) roomId --> (enum int) State <Seen (0) | Currently Displayed (1) | Unseen Message (2)>
    };

    //TODO: Get websocket url as property (so server url can be provided from outside the 
    // component)

    constructor(props){ //Properties should include at minimum Username and isAdmin
        super(props);
        this.state.Username = props.username;
        this.state.isAdmin = props.isAdmin;
        this.websocket.onmessage = this.onWSMessage;
        this.websocket.onopen = this.onWSOpen;
        if(this.state.isAdmin){
            this.render = this.renderAdmin;
        }
    }

    onWSOpen = () => {
        if(!this.state.isAdmin){ //Not admin -> gets their own room. Set current room as well
                this.websocket.send(JSON.stringify({
                type: "register",
                //room: this.state.Username,
                user: this.state.Username,
                isadmin: false
            })); //Expect a receipt JSON from server.
        }else{
            this.websocket.send(JSON.stringify({
                type: "register",
                room: this.state.Username,
                user: this.state.Username,
                isAdmin: true
            })); //Expect receipt JSONs from server whenever admin is added to a room on new client connect.
        }
    };

    onWSMessage = (ev) => {

        var msg = JSON.parse(ev.data);// {type:<register,smsg,msg,receipt,reload>, room:, user:, msg:}
        var activerooms = this.state.active_rooms;
        var notificationstate = this.state.notificationState;
        var messages_By_Room = this.state.messagesByRoom;
        switch (msg.type) {
             //Post-condition: Room where message is received is set to 'Unseen Messages'
             // if it is not the currently displayed room.
            case "smsg":
            case "msg":{
                var room = msg.room;
                
                var room_messages = messages_By_Room.get(room);
                if (room_messages === undefined) room_messages = [];
                room_messages.push(msg);
                messages_By_Room.set(room,room_messages);
                
                
                // this.setState({messagesByRoom: messages_By_Room});
                // break;
                if(this.state.current_room !== room) notificationstate.set(room,2);
                console.log(notificationstate);
                this.setState({messagesByRoom: messages_By_Room, notificationState: notificationstate});
                break;	              
            }
            //Post-condition: Created room is set to 'Unseen Messages'. (That the chat is new is a message itself)
            case "receipt":{
                var newroom = msg.room;
                activerooms.push(newroom);
                notificationstate.set(newroom.roomId,0);
                this.setState({active_rooms:activerooms, notificationState:notificationstate}); //Add the room on receipt to active_rooms (both admins and non-admins)
                
                if(!this.state.isAdmin){
                    this.setState({current_room: newroom.roomId}); //Non-admins only: set room as current room. Admins will have to use the selector
                    return;
                }
                console.log(this.state)
                this.render = this.renderAdmin;
                this.forceUpdate();
                break;
            }
            //Post-condition: Get out of the room.
            case "eviction":{
                //TODO: Test this
                var messagesInRoom = messages_By_Room.get(msg.room);
                if(messagesInRoom === undefined || messagesInRoom === null) messagesInRoom = [];
                messagesInRoom.push({type:"smsg", room: msg.room, user: "!System", msg: "The client has left."});
                messagesInRoom.push({type:"smsg", room: msg.room, user: "!System", msg: "This chat is no longer accessible."});
                messages_By_Room.set(msg.room,messagesInRoom);
                notificationstate.set(msg.room,69);
                const cr = this.state.current_room;
                var filteredrooms = this.state.active_rooms.filter(function (v){
                    return ((v.roomId !== msg.room) || (v.roomId === cr));
                });

                 this.setState({ active_rooms: filteredrooms, messagesByRoom: messages_By_Room, notificationState: notificationstate});
                }
        }
    };

    WSSendChat = (txt) => {
        if(this.state === null){
            return;
        }
        this.websocket.send(JSON.stringify({type:"msg",room: this.state.current_room , user: this.state.Username, msg:txt}));
    };

    //Pre-condition: rm must be in this.state.active_rooms
    //Post-condition: previous current_room state is set to 'Seen' or deleted from maps if marked for deletion.
    onChatRoomSelect = (rm) => {
        var notificationstate = this.state.notificationState;
        var prev_crm = this.state.current_room;
        if(notificationstate.get(prev_crm) === 69){
            var messagesbyroom = this.state.messagesByRoom;
            messagesbyroom.delete(prev_crm);
            notificationstate.delete(prev_crm);
            var filteredrooms = this.state.active_rooms.filter(function (v){
                return v.roomId !== prev_crm;
            });
            this.setState({active_rooms: filteredrooms, messagesByRoom: messagesbyroom});
        }else{
            notificationstate.set(prev_crm,0);
        }
        notificationstate.set(rm,1);
        this.setState(
            {//cur_room_idx: this.state.cur_room_idx + 1,
                current_room: rm,
                notificationState: notificationstate,
            });
    };

    renderAdmin = () => {
        console.log("renderadm")
        var messages = this.state.messagesByRoom.get(this.state.current_room);
        if(messages === undefined || messages == null){
            messages = [];
        }
        return(
            <Grid container spacing={0}>
                <Grid item>
                <ChatSelector activerooms = {this.state.active_rooms}
                                  onSelect = {this.onChatRoomSelect}
                                  notificationState = {this.state.notificationState}/>                </Grid>
                <Grid item>
                    <ChatMessageDisplay messages = {messages}/>
                    <ChatInput onSend = {this.WSSendChat}/>
                </Grid>
            </Grid>
        );
    };

    render(){
        var messages = this.state.messagesByRoom.get(this.state.current_room); //Get all messages stored.
        if(messages === undefined || messages == null){
            messages = [];
        }
        return( //ChatMessageDisplay will print everything
            <div>
                <ChatMessageDisplay messages = {messages}/>
                <ChatInput onSend = {this.WSSendChat}/>
            </div>
        )
    };

}

export default ChatComponent;
