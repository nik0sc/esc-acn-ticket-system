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
    }

    renderClientuser = (r) => {
        var room_id = r.roomId;
        var room_displayed_name = r.name;
        return(
            <li>
                <div>
                    <Button style={{color: 'white', textTransform: 'none', outline: 'none', backgroundColor: '#A4A4A7'}}
                    onClick={() => this.props.onSelect(room_id)}>{room_displayed_name}</Button>
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