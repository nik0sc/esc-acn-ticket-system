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
import {Redirect, NavLink, Route, Switch, Link} from 'react-router-dom'
import axios from 'axios'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import { ToastsStore } from 'react-toasts';
import { createMuiTheme } from '@material-ui/core/styles';
import logo from '../img/acn_icon.png';


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
    backgroundColor: '#F9C03E',
    fontWeight: 'bold',
    color: 'black',
    '&:hover': {
      backgroundColor: '#EBA810',
    }
  },
});

//loadProgressBar();




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

  getUser = (e) => {
    e.preventDefault();
    //const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    //console.log("username: " + username);
    console.log("password: " + password);
    if(username && password){
    axios.post('https://user-service.ticket.lepak.sg/user/login', {
      username: username,
      password: password,
    })
    .then((res => {
    const LoggedSessionToken = res.data.session_token;
    console.log('current session token: ' + LoggedSessionToken);
    const cookies = new Cookies();
    cookies.set('sessionToken', LoggedSessionToken, {path: '/'});
    console.log(cookies.get('sessionToken'));
    this.setState({
      redirect: true,
    })
    console.log('success');
  }))
  .catch(error => {
    console.log('failed')
    ToastsStore.error('Login failed. Username not registered.')
  })  
  }
    else if(!username || !password){
      ToastsStore.error('Empty fields detected.')
   }
  }


  render(){
    
    const { classes } = this.props;
    if(this.state.redirect){
      this.props.history.push('/dashboard');
      // return <Redirect to="/dashboard" />
    }  
    return(
    <div>
     <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        
        <img src={logo} width='40' height='40' alt="acn_logo" />
          {/* <LockOutlinedIcon /> */}
          
        {/* <div className="PageSwitcher">
        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item" 
        >Sign In</NavLink>
        <NavLink to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item" 
        >Sign Up</NavLink> 
        {/* <Button style={{backgroundColor: '#414141', outline: 'none', }}>Sign In</Button>
        <Button>Sign Up</Button> */}
        {/* </div>  */}
        <form className={classes.form}  onSubmit={this.getUser.bind(this)} >
          <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleInputChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <InputLabel>Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange}/>
            </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
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


export default compose(
  withRouter,
  withStyles(styles),
)(SignIn);
