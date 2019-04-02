import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';


const cookies = new Cookies();


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  but: {
    marginLeft: 'auto',
  }
};
class ButtonAppBar extends React.Component{
    state = {
        redirect: false
    }

    handleClick = (e) => {
        cookies.remove('auth');
        this.setState({
            redirect: true
        })


    }
    
    render() {

        const { classes } = this.props;
        if(this.state.redirect){
            return <Redirect to="/" />
        }

        return(

            <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Support Ticket System
          </Typography>
          {/* <Button className={classes.but}> Live Chat</Button> */}
          <Button onClick={this.handleClick.bind(this)} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
        )
    }
}


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ButtonAppBar);
