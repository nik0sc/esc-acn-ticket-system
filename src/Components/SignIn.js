import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Redirect, NavLink, Route} from 'react-router-dom'
import axios from 'axios'
import LoginRequired, {openSnackbar} from './LoginRequired';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component{

  state= {
    redirect: false,
  }  

  handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
}

handleChange = (event) => {
  const password = event.target.value;
  this.setState({ password });
}

handleInputChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}



  getUser = async(e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    if(email && password){
      axios.get(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login?email=${email}&password=${password}`, {
        headers: {
          'Server-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJnWVppRDZzbzJLcXNMT1hmVUt5TjZpdHVXUXhaQnkyN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2NDksImV4cCI6MTU1MjU0NDY0OSwiYXpwIjoiZ1laaUQ2c28yS3FzTE9YZlVLeU42aXR1V1F4WkJ5MjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.uSISsVSh1REzY3UuMWm_QTEd4xs10cqoWtQpHj3xz9HhKx1_N0s4Wj7A-rQRsQJzQ12IiB5A05lQ17DdkaQkfi_4zeNTGQTo3MvE9Glf1wfcWCMe2WAPr78GSL0RQKuyKZpwrlFuxNghN_-sEVrG4gI7VZyWEc6S_m2076TXVPigTF29u9dA6NgzQkVRaqssulgO_SaZtG9mFwAJ19CaQluqrx10GHsd6OKN2YXPzvSBFa2ouUHlncePbgtKsOl660MQFnyTGtLTzYZPJRX7mpTHSSb4RWoY45lwtt5vfV0HwSC84nKyZvfkK6frFZkpltfSjiWRo6R62lzt5r1dcw'
        }
      })
      .then((res) => {
        var session_token = res.data.sessionToken;
        // keep token so that can pass to backend
        if (typeof session_token === 'undefined') {
          // Die
          return;
        }



        if(res.request.status === 200){
          console.log(res)
          this.setState({
            redirect: true,
          })
        }
      }
    )
    .catch(error => {      
      openSnackbar({ message: 'Login failed. Wrong email/password.' });
    });
    }
    else if(!email || !password){
      openSnackbar({message: 'Empty fields detected. Please fill in your email and password'})
    }

  }
  render(){
    
    const { classes } = this.props;
  
    if(this.state.redirect){
      return <Redirect to="/dashboard" />
    }

    return(
      
      <div>
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <div className="PageSwitcher">
                <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink> 
            </div>
            <MuiThemeProvider MuiTheme={getMuiTheme}>
            <LoginRequired />
            </MuiThemeProvider>
        <form className={classes.form}  onSubmit={this.getUser} noValidate>
          <FormControl margin="normal" required fullWidth>
            <input id="email" name="email" type="email" autoComplete="email" autoFocus onChange={this.handleInputChange} className="email"/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form> 
      </Paper>
    </main>
      </div>
    )
  }
}


export default withStyles(styles)(SignIn);