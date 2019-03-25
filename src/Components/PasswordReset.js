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
import {Redirect, NavLink} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

class PasswordReset extends React.Component{

  state= {
    redirect: false
  }

  updatePass = (e) => {
    const old = e.target.elements.old.value;
    const neww = e.target.elements.neww.value;

    
  }


  getUser = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;

    if(username && password && email && phone){
        axios.post(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users`, {
          username: username,
          email: email,
          password: password,
          phone: phone,
        }, {
          headers: {
            'Server-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJnWVppRDZzbzJLcXNMT1hmVUt5TjZpdHVXUXhaQnkyN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2NDksImV4cCI6MTU1MjU0NDY0OSwiYXpwIjoiZ1laaUQ2c28yS3FzTE9YZlVLeU42aXR1V1F4WkJ5MjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.uSISsVSh1REzY3UuMWm_QTEd4xs10cqoWtQpHj3xz9HhKx1_N0s4Wj7A-rQRsQJzQ12IiB5A05lQ17DdkaQkfi_4zeNTGQTo3MvE9Glf1wfcWCMe2WAPr78GSL0RQKuyKZpwrlFuxNghN_-sEVrG4gI7VZyWEc6S_m2076TXVPigTF29u9dA6NgzQkVRaqssulgO_SaZtG9mFwAJ19CaQluqrx10GHsd6OKN2YXPzvSBFa2ouUHlncePbgtKsOl660MQFnyTGtLTzYZPJRX7mpTHSSb4RWoY45lwtt5vfV0HwSC84nKyZvfkK6frFZkpltfSjiWRo6R62lzt5r1dcw',
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
          toast.error('Invalid email or username/email is already registered',{
            position: "bottom-center"
          })
        });
    }else{
      toast.error('Empty fields detected', {
        position: "bottom-center"
        });
    }
  }


  render(){
    const { classes } = this.props;

    if(this.state.redirect){
      return <Redirect to="/dashboard" />
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
      <CssBaseline />
      <Paper className={classes.paper}>
        <form className={classes.form}  onSubmit={this.updatePass} noValidate>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="old">Old Password</InputLabel>
            <Input id="old" name="old" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="neww">New Password</InputLabel>
            <Input id="neww" name="neww" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>


      </div>
    )
  }
}



export default withStyles(styles)(PasswordReset);