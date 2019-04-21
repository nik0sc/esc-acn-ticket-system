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

    //TODO: Get websocket url as property (so server url can be provided from outside the component)
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
                isAdmin: false
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
        switch (msg.type) {
            //Post-condition: Room where message is received is set to 'Unseen Messages' if it is not the currently displayed room.
            case "smsg":
            case "msg":{
                var room = msg.room;
                var messages_By_Room = this.state.messagesByRoom;
                var notificationstate = this.state.notificationState;
                var room_messages = messages_By_Room.get(room);
                if (room_messages === undefined) room_messages = [];
                room_messages.push(msg);
                messages_By_Room.set(room,room_messages);
                if(this.state.current_room !== room) notificationstate.set(room,2);
                console.log(notificationstate);
                this.setState({messagesByRoom: messages_By_Room, notificationState: notificationstate});
                break;
            }
            //Post-condition: Created room is set to 'Seen'. (There is nothing to be seen anyway)
            case "receipt":{
                var activerooms = this.state.active_rooms;
                var notificationstate = this.state.notificationState;
                var newroom = msg.room;
                activerooms.push(newroom); notificationstate.set(newroom,0);
                this.setState({active_rooms:activerooms, notificationState:notificationstate}); //Add the room on receipt to active_rooms (both admins and non-admins)
                if(!this.state.isAdmin){
                    this.setState({current_room: newroom.roomId}); //Non-admins only: set room as current room. Admins will have to use the selector
                }
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
    //Post-condition: previous current_room state is set to 'Seen',
    //                current_room is set to rm and room rm's state is set to 'Currently Displayed',
    //                the admin's chat display will render the selected room since the state has changed.
    onChatRoomSelect = (rm) => {
        var notificationstate = this.state.notificationState;
        var prev_crm = this.state.current_room;
        notificationstate.set(prev_crm,0);
        notificationstate.set(rm,1);
        console.log("cc2"+ notificationstate);
        this.setState(
            {//cur_room_idx: this.state.cur_room_idx + 1,
                current_room: rm,
                notificationState: notificationstate
            });
    };

    renderAdmin = () => {
        var messages = this.state.messagesByRoom.get(this.state.current_room);
        if(messages === undefined || messages == null){
            messages = [];
        }
        return(
            <Grid container spacing={0}>
                <Grid item>
                    <ChatSelector activerooms = {this.state.active_rooms}
                                  onSelect = {this.onChatRoomSelect}
                                  notificationState = {this.state.notificationState}/>
                </Grid>
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
