import React from  'react';

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
                    autoFocus="true"
                />
                <button color="inherit">Send</button>
            </form>
        </div>);
    }
}

export default ChatInput