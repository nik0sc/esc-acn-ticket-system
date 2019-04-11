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
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
// unique code for every account, based on time

// const verificationCode= Math.round( (new Date()).valueOf()/100000)%10000;
// console.log(verificationCode);
const message=null;

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
    redirect: false,
    username: '',
    email: '',
    verifyCode: '',

  }

  componentDidMount(){
    this.setState({
      verifyCode: Math.round( (new Date()).valueOf()/100000)%10000,
    }, function() {
      console.log(this.state.verifyCode);
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })

    //console.log("trying: " + this.state.email + " " + this.state.username);
    
  }


  handleVerify = (e) => {
    var validator = require("email-validator");
    if(this.state.username === '' || this.state.email === ''){
      ToastsStore.error('Need username and email for verification');
    }
    else if(!validator.validate(this.state.email)){
      ToastsStore.error('Invalid email. Unable to send verification code')
    }else{
      axios({
        method: "POST",
        url: "https://varificationbackend.herokuapp.com/send",
        data: {
          name: this.state.username,
          email: this.state.email,
          message: this.state.verifyCode,
        }
      }).then((res) => {
        if(res.data.msg === "success"){
          console.log("email code sent successfully")
          alert("Verification code sent. Please fill in your code in the form.");
        }
        else if(res.data.msg === "fail"){
          console.log("email code not sent")
          alert("Verification code not sent. Please refresh browser and try again.")
        }
      })
    }
  }


  getUser = (e) => {
    e.preventDefault();
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const fullName = firstName + " " + lastName;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const email = e.target.elements.email.value;
    var phone = e.target.elements.phone.value;
    const confirmpassword = e.target.elements.confirmpassword.value;
    const code = e.target.elements.vecode.value;
    const cookies = new Cookies();
    const recaptchaTok = cookies.get('recaptchaToken');
    if(phone.length !== 8){
      ToastsStore.error('Please enter a valid phone number.')
    }
    if(password !== confirmpassword){
      ToastsStore.error('Passwords do not match.')
    }
    else if(code != this.state.verifyCode){
      ToastsStore.error('Your verification code is not correct');
    }

    else{
      if(username && password && email && phone && recaptchaTok && firstName && lastName && code){
        // axios.post(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users`, {
        //   username: username,
        //   email: email,
        //   password: password,
        //   phone: phone,
        //   // not added first and last name 
        // }, {
        //   headers: {
        //     'Server-Token': `${process.env.REACT_APP_API_KEY}`,
        //     'Content-Type':'application/json',
        //   }
        // })
        // .then((res) => {
        //   if(res.request.status === 201){
        //     console.log(res.data)
        //     this.setState({
        //       redirect: true,
        //     })
        //   }
          
        // }
        // )
        // .catch(error => { 
        //   toast.error('Username/Email is already registered',{
        //     position: "bottom-center"
        //   })
        // });
        axios({
          method: "POST",
          url: "https://emailserver1.herokuapp.com/send",
          data: {
            name: username,
            email: email,
            message: message,
          }
        })

        axios.post(`https://esc-ticket-service.lepak.sg/user`, {
          username: username,
          password: password,
          phone: phone,
          email: email,
          long_name: fullName,
        }, {
          headers: {
            'Content-Type':'application/json',
          }
        })
        .then((res) => {
          if(res.request.status === 200){
            console.log("Register succeeded: " + res.data);
            this.setState({
              redirect: true,
            })
          }
        })
        .catch(error => {
          ToastsStore.error('Username/Email is already registered.')
        })
       
    }
    if(!username || !email || !password || !phone || !recaptchaTok || !firstName || !lastName || !code){
      ToastsStore.error('Empty fields detected. Please fill all the fields.')
    } 
  }}
    
  

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
      ToastsStore.success('You can log in with your new registered account now.')
    }
    
    return(
      
      <div>
          <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} lightBackground/>
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
            <Input id="username" name="username" onChange={this.handleChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required className={classes.first}>
            <InputLabel htmlFor="email">Email </InputLabel>
            <Input name="email" id="email" autoComplete="email" onChange={this.handleChange}/>
          </FormControl>
          <FormControl>
          <Button
            fullWidth
            variant="contained"
            color = "primary"
            className= {classes.submit}
            onClick={this.handleVerify}
            >
            Verify
          </Button>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="vecode">Verification Code</InputLabel>
            <Input id="vecode" name="vecode"/>
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
