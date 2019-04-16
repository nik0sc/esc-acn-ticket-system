import React from 'react';

class ChatMessageDisplay extends React.Component {

    renderMessage = (m) => {
        const {user, msg} = m;
        return(
            <li>
                <div>
                    <b>{user}:</b>{" " + msg}<br></br>
                </div>
            </li>
        );
    };

    render(){
        const arrm = this.props.messages;
        return(
            <div style={"height: 280px; position: static; bottom: 0; overflow: scroll;"}>
                <ul style={"list-style-type: none;"}>
                    {arrm.map(m => this.renderMessage(m))}
                </ul>
            </div>
        );
    }
}

export default ChatMessageDisplay;