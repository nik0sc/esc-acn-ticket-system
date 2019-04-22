import React from 'react';
import Button from '@material-ui/core/Button';
import { ListSubheader, List, ListItem, ListItemText } from '@material-ui/core';

class ChatSelector extends React.Component {

    state = {
        clientusers: [] //(Array| {int,String}) {roomId, name}
    };

    constructor(props){
        super(props);
        this.state.clientusers = props.activerooms;
        console.log(props.notificationState);
        this.state.notifications = props.notificationState;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.clientusers !== this.props.activerooms)
            this.setState({clientusers: this.props.activerooms, notifications: this.props.notificationState});
    }

    renderClientuser = (r) => {
        var room_id = r.roomId;
        var room_displayed_name = r.name;
        console.log(r);
        var room_state = this.state.notifications.get(room_id);
        var color = (room_state === 0 || room_state === undefined) ? "#AAEEFF" :
                    (room_state === 69) ? "#999999" :
                    (room_state === 1) ? "#40FF80" : "#FF8888" ;
        return(
            <li>
                <div>
                    {/* <Button style={{color: 'white', textTransform: 'none', outline: 'none', backgroundColor: '#A4A4A7'}}
                    onClick={() => this.props.onSelect(room_id)}>{room_displayed_name}</Button> */}
                    <Button onClick={() => this.props.onSelect(room_id)}
                            disabled={room_state === 69}
                            style={{
                                background: color,
                                borderRadius: 3,
                                border: 0,
                                color: 'black',
                                height: 40,
                                padding: '0 30px'}}>{room_displayed_name}</Button>
                </div>
            </li>
        )
    };

    render(){
        return(
            <div style={{position: "static", bottom: "0", overflow: "auto", marginTop: '20px'}}>
                {/* {/* <ListSubheader>Active Chats</ListSubheader> */}
                {/* <ListItem style={{backgroundColor: "#A4A4A7"}}>
                {this.state.clientusers.map(r => this.renderClientuser(r))}
                </ListItem> */}
            <ul style={{listStyleType: "none"}}>
            <li>Active Chats</li>
            {this.state.clientusers.map(r => this.renderClientuser(r))}
                </ul>
            </div>
        );
    }
}

export default ChatSelector;