import React from 'react';
import Button from '@material-ui/core/Button';

class ChatSelector extends React.Component {

    state = {
        clientusers: [] //(Array| {int,String}) {roomId, name}
    };

    constructor(props){
        super(props);
        this.state.clientusers = props.activerooms;
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