import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Admin from './Components/Admin';
import Tickets from './Components/Tickets'
import './App.css';
import Dashboard from './Components/Dashboard';
import ButtonAppBar from './Components/ButtonAppBar';
import SignIn from './Components/SignIn'
import RegisterNew from './Components/RegisterNew';
import { ToastContainer, toast } from 'react-toastify';
import { loadReCaptcha } from 'react-recaptcha-google'
import {Link,Redirect, Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from '@material-ui/core';
import NotFound from './Components/NotFound';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import CommentExampleReplyFormOuter from './Components/CommentExampleReplyFormOuter';

const cookies = new Cookies();


const SecretRoute = ({ component: Comp, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return (cookies.get('auth') === 'y') ? (
          <Comp {...props} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
};

loadProgressBar();


class App extends Component {
  
  componentDidMount() {
    loadReCaptcha();
  }

  token = () => {
    console.log(cookies.get('auth'))
  }
  
  render() {
    
    return (      
      // <div className="wrapper">
      //   <div className="main"> 
      //   <div className="container"> 
      //     <div className="row" >
      <div>
        {/* <Button onClick={this.token}> help </Button> */}
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
          
          <Router>
          <div className="App">
          <div className="App_Aside"></div>
          <div className="App_Form" >
          <Switch>
          <Route path="/register" component={RegisterNew}>
              </Route>
              <Route exact path="/" component={SignIn}  >
              </Route>
              <Route path="/admin" component={Admin} >
              </Route>
              <SecretRoute path="/dashboard" component={Dashboard} >
              </SecretRoute>
              {/* <Route path="/dashboard" component={Dashboard} >
              </Route> */}
              <Route path="/tickets" component={Tickets}>
              </Route>
              <Route path="/talk" component={CommentExampleReplyFormOuter}>
              </Route>
              <Route path="*" exact={true} component={NotFound} />
              </Switch>
              </div>
          </div>
        </Router>
            
          </div>
    );
  }
}

export default App;