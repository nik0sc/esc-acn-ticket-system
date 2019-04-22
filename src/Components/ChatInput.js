import React from  'react';
import { Button, Input, OutlinedInput } from '@material-ui/core';

class ChatInput extends React.Component {
    state = {
        text: ""
    };

    onChange(e){
        this.setState({text: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        var txt = this.state.text;
        this.setState({text:""});
        this.props.onSend(txt);
    }

    render(){
    return (
        <div className="containerChat">
            <form className="chatForm" onSubmit={e => this.onSubmit(e)}>
                <OutlinedInput
                    onChange={e => this.onChange(e)}
                    value={this.state.text}
                    type="text"
                    placeholder="Type your message..."
                    autoFocus={true}
                    required
                    style={{display: 'inline-flex'}}
                />
                {/* <Button size="large" style={{fontWeight: 'bold',
                color: 'black', backgroundColor: '#F2F5F8', display: "inline-flex",}}
                >Send</Button> */}
                <Button type="submit"
                    style={{
                    background: '#EEAAFF',
                    borderRadius: 3,
                    border: 0,
                    color: 'black',
                    height: 40,
                    padding: '0 30px'}}>Envoyer</Button>
            </form>
        </div>);
    }
}

export default ChatInput
