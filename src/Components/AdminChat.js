import ChatComponent from './ChatComponent';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Card, CardContent, Grid, FormControl, Select, InputLabel, OutlinedInput, MenuItem, DialogTitle, DialogContent } from '@material-ui/core';
import { CardActions, TextField, Paper } from 'material-ui';
import axios from 'axios';
import logo from '../img/acnapi_logo.png';
import AdminReplyTextField from './AdminReplyTextField';
import {Redirect, NavLink, Route, Switch, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import Cookies from 'universal-cookie';
import { ThemeProvider } from '@livechat/ui-kit';


const cookies = new Cookies();
const CurrentSessionToken = cookies.get('AdminSessionToken');


const styles = (theme) => ({  
  title: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  save:{
    position: 'absolute',
    fontWeight: 'bold',
    color:'#F9C03E',
    outline: 'none',
    fontSize: 18,
    marginLeft: 1150,
  },
});


class AdminChat extends React.Component {
    state={
        mounted: false,
    }    

  axiosFunc(){

    axios.get(`https://user-service.ticket.lepak.sg/user/me`,{
      headers: {
        'X-Parse-Session-Token':  CurrentSessionToken, 
      }
    })
    .then((res => {
      if(res.request.status === 200){
        if(res.data.user_type !== 1){
            this.setState({is_admin: true});
        }else{
            this.setState({is_admin: false});
        }  
        this.setState({
            fullName: res.data.long_name,
            username: res.data.username,
            mounted: true,
        })
    }
    }))
}



    renderChat(){
        if(this.state.mounted){
            return <ChatComponent username={this.state.username} isAdmin={this.state.is_admin} />
        }
    }
    
    componentDidMount(){
        this.axiosFunc(); 
    }
   
    
  render() {

    const { classes } = this.props;

    


    return (
      <div>
           <AppBar style={{backgroundColor: '#000000', position: 'static',}} >
            <Toolbar>
              <img src={logo} width='100px' height='40px' alt="teamwork" />
              <Typography variant="h6" color="inherit" className={classes.title}>
               Admin: Real-Time Chat
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{backgroundColor: '#F9C03E'}}>
          </div>
          <Grid container style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor:"#F2F5F8"}}>
            <Grid item xs={6} style={{alignItems: 'center', alignContent: 'center', textAlign: 'center', 
          }}>
            {this.renderChat()}
            </Grid>
          </Grid>





         
        </div>
    
    );
}}


AdminChat.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default compose(
  withRouter,
  withStyles(styles),
)(AdminChat);
