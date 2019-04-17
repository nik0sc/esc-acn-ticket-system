import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Redirect, NavLink} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recaptcha from './Recaptcha';
import Cookies from 'universal-cookie';
import { Divider } from '@material-ui/core';
import { Dialog } from 'material-ui';
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
    alignItems: 'center',

  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  first:{
    marginRight: theme.spacing.unit,
  }
});

class RegisterNew extends React.Component{

  state= {
    redirect: false
  }


  getUser = (e) => {
    e.preventDefault();
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const confirmpassword = e.target.elements.confirmpassword.value;
    const cookies = new Cookies();
    const recaptchaTok = cookies.get('recaptchaToken');
    var validator = require("email-validator");
    if(!validator.validate(email)){
        toast.error('Invalid email')
    }
    else if(password !== confirmpassword){
      toast.error('Passwords do not match')
    }
    else{
      if(username && password && email && phone && recaptchaTok && firstName && lastName){
        axios.post(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users`, {
          username: username,
          email: email,
          password: password,
          phone: phone,


          // not added first and last name 
        }, {
          headers: {
            'Server-Token': `${process.env.REACT_APP_API_KEY}`,
            'Content-Type':'application/json',
          }
        })
        .then((res) => {
          if(res.request.status === 201){
            console.log(res.data)
            this.setState({
              redirect: true,
            })
          }
          
        }
        )
        .catch(error => { 
          toast.error('Username/Email is already registered',{
            position: "bottom-center"
          })
        });
    }
    if(!username || !email || !password || !phone || !recaptchaTok || !firstName || !lastName){
      toast.error('Empty fields detected', {
        position: "bottom-center"
      });
    } 
    }
    
  }

  // renderCode(){
  //   if(this.state.redirect)
  //   return (<Dialog>
  //     open={true}
  //   </Dialog>)
  // }


  render(){
    const { classes } = this.props;

    if(this.state.redirect){
      this.props.history.push('/');
      toast.success("You can sign in with your new account now.")
    }

    
    return(
      
      <div>
          <ToastContainer 
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover={false}/>
          <main className={classes.main}>
          {/* {this.renderCode()} */}
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
        <FormControl margin="normal" required className={classes.first}>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" name="firstName" autoFocus />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" name="lastName" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" id="email" autoComplete="email" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input name="phone" id="phone" autoComplete="phone"/>
          </FormControl> 
          <FormControl margin="normal" required className={classes.first}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password"  />
          </FormControl>
          <FormControl margin="normal" required >
            <InputLabel htmlFor="confirmpassword">Repeat Password</InputLabel>
            <Input name="confirmpassword" type="password" id="confirmpassword" />
          </FormControl>
        
          <Recaptcha className={classes.recap}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </Paper>
    </main>


      </div>
    )
  }
}




export default compose(withRouter, withStyles(styles))(RegisterNew);
