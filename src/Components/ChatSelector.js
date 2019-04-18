import React from 'react';
import Button from '@material-ui/core/Button';

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
                    <button onClick={() => this.props.onSelect(room_id)}>{room_displayed_name}</button>
                </div>
            </li>
        )
    };

    render(){
        return(
            <div style={{height: "100px", position: "static", bottom: "0", overflow: "auto"}}>
                <ul style={{listStyleType: "none"}}>
                    <li>Active Chats</li>
                    {this.state.clientusers.map(r => this.renderClientuser(r))}
                </ul>
            </div>
        );
    }
}

export default ChatSelector;