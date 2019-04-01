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
import {Redirect, NavLink, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';

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
          'Server-Token': `${process.env.REACT_APP_API_KEY}`,
        }
      })
      .then((res) => {
        // keep token so that can pass to backend
        // if (typeof session_token === 'undefined') {
        //   // Die
        //   return;
        // }

        if(res.request.status === 200){
          const cookies = new Cookies();
          var session_token = res.data.sessionToken;
          cookies.set('sessionToken', session_token, {path: '/'});
          cookies.set('auth', 'y', {path: '/'});
          console.log(res)
          this.setState({
            redirect: true,
          });
          
          
          
        }
      }
    )
    .catch(error => {      
      toast.error('Login failed. Wrong email/password.',{
        position: "bottom-center"
      })
    });
    }
    else if(!email || !password){
      toast.error('Empty fields detected. Please fill in your email and password',{
        position: "bottom-center"
      })
    }

  }
  render(){
    
    const { classes } = this.props;
  

    if(this.state.redirect){
      this.props.history.push('/dashboard')
      // return <Redirect to="/dashboard" />
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
        <form className={classes.form}  onSubmit={this.getUser.bind(this)} noValidate>
          <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" name="email" type="email" autoComplete="email" autoFocus onChange={this.handleInputChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <InputLabel>Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange}/>
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


export default compose(
  withRouter,
  withStyles(styles),
)(SignIn);
