import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import logo from '../img/acnapi_logo.png';


const cookies = new Cookies();


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  but: {
    marginLeft: 'auto',
  },
  logout:{
    fontWeight: 'bold',
    color:'#F9C03E',
    outline: 'none',
    textTransform: 'none',
    fontSize: 18,
  }
};
class ButtonAppBar extends React.Component{
    state = {
        redirect: false,
        openChat: false,
    }

    handleClick = (e) => {
        cookies.remove('sessionToken');
        this.setState({
            redirect: true
        })


    }

    handleChat = () => {
      this.setState({
        openChat: true,
      })
    }
    
    render() {

        const { classes } = this.props;
        if(this.state.redirect){
          return <Redirect to='/'/>
        }

        if(this.state.openChat){
          return <Redirect to='/chat'/>
        }

    
        return(

            <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: '#000000'}}>
            <Toolbar>
              <img src={logo} width="100px" height="40px" alt="acn_logo"/>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Support Ticket System
          </Typography>
          <Button onClick={this.handleChat.bind(this)} color="inherit" className={classes.logout}> Live Chat Test</Button>
          <Button onClick={this.handleClick.bind(this)} color="inherit" className={classes.logout}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
        )
    }
}


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default compose(withRouter, withStyles(styles),)(ButtonAppBar);
