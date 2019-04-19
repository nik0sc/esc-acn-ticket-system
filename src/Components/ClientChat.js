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
const CurrentSessionToken = cookies.get('sessionToken');


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


class ClientChat extends React.Component {
    state={
        mountChat: false,
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
            mountChat: true,
        })
    }
    }))
}



    renderChat(){
        if(this.state.mountChat){
            return <ChatComponent username={this.state.username} isAdmin={this.state.is_admin} />
        }
    }
    
    componentDidMount(){
        this.axiosFunc(); 
    }
   
    
  render() {

    const { classes } = this.props;

    if(this.state.redirect){
      this.props.history.push('/dashboard');
    }   


    return (
      <div>
           <AppBar style={{backgroundColor: '#000000', position: 'static',}} >
            <Toolbar>
              <img src={logo} width='100px' height='40px' alt="teamwork" />
              <Typography variant="h6" color="inherit" className={classes.title}>
                Chat With Admins
              </Typography>
              <Button color="inherit" className={classes.save} onClick={this.handleClose}>
                CLOSE
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{backgroundColor: '#F9C03E'}}>
          </div>
          {/* <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          >
          <Grid item xs={12}>
          <Card>
          {this.renderChat()}
          </Card>
          </Grid>
          </Grid> */}
          {this.renderChat()}





         
        </div>
    
    );
}}


ClientChat.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default compose(
  withRouter,
  withStyles(styles),
)(ClientChat);
