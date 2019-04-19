import React from 'react';
import { TextField } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, Avatar,
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	Title,
	Subtitle,
	MessageGroup,
	MessageButtons,
	MessageButton,
	MessageTitle,
	MessageMedia,
	TextComposer,
	Row,
	Fill,
	Fit,
	IconButton,
	SendButton,
	EmojiIcon,
	CloseIcon,
	Column,
	RateGoodIcon,
	RateBadIcon,
    Bubble, } from '@livechat/ui-kit'
    import { withTheme } from 'styled-components'


const theme = {
    vars: {
        'primary-color': 'red',
        'secondary-color': '#fbfbfb',
        'tertiary-color': '#fff',
        'avatar-border-color': 'blue',
    },
    AgentBar: {
        Avatar: {
            size: '42px',
        },
        css: {
            backgroundColor: 'var(--secondary-color)',
            borderColor: 'var(--avatar-border-color)',
        }
    },
    Message: {
        css: {
            fontWeight: 'bold',
        },
    },
}

class ChatMessageDisplay extends React.Component {

    renderMessage = (m) => {
        const {user, msg} = m;
        return(
            <li>
                <div>
                    {/* <b>{user}:</b>{" " + msg}<br></br> */}
                    <span style={{fontSize:10, fontWeight: 'bold', }}>{user} says:</span> 
                    <p className="clientBubble">{msg}</p>
                </div>
                {/* <Message authorName={user} style={{color: "black"}}>
                <MessageText>{msg}</MessageText>
                </Message> */}
                {/* <ThemeProvider theme={theme}>
                <Row reverse>
                <Message isOwn deliveryStatus="seen">
                <MessageText>{msg}</MessageText>
                </Message>
                </Row>
                </ThemeProvider> */}
            </li>
        );
    };

    render(){
        const arrm = this.props.messages;
        return(
                <div style={{height: "80vh", overflow: "auto"}}>
                <ul style={{listStyleType: "none"}}>
                    {arrm.map(m => this.renderMessage(m))}
                </ul>
            </div>   

        );
    }
}

export default withTheme(ChatMessageDisplay);