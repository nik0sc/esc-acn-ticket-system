import React from  'react';
import Button from '@material-ui/core/Button';

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
        <div>
            <form onSubmit={e => this.onSubmit(e)}>
                <input
                    onChange={e => this.onChange(e)}
                    value={this.state.text}
                    type="text"
                    autoFocus={true}
                />
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