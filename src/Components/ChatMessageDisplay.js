import React from 'react';

class ChatMessageDisplay extends React.Component {

    renderMessage = (m) => {
        const {user, msg} = m;
        return(
        <li>
            <div>
                <div>
                    {user}
                </div>
                <div>{msg}</div>
            </div>
        </li>
        );
    }

    render(){
        const arrm = this.props.messages;
        return(
            <ul>
                {arrm.map(m => this.renderMessage(m))}
            </ul>
        );
    }
}

export default ChatMessageDisplay;