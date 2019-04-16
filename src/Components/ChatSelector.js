import React from 'react';

class ChatSelector extends React.Component {

    state = {
        clientusers: []
    };

    constructor(props){
        super(props);
        this.state.clientusers = ["aaee","ah","ff","winnie the pooh"]//props.activerooms;
    }

    renderClientuser = (r) => {
        return(
            <li>
                <div>
                    <button onClick={this.props.onSelect}>{r}</button>
                </div>
            </li>
        )
    }

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