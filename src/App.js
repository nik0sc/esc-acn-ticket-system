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
import NewRoute from './Components/NewRoute';
import ReviewTicketAgain from './Components/ReviewTicketAgain';
import ReviewTicket from './Components/ReviewTicket';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import LandingPage from './Components/LandingPage';
import ClientReviewTicket from './Components/ClientReviewTicket';
import ClientChat from './Components/ClientChat';
import { ThemeProvider } from '@livechat/ui-kit';
import ChatComponent from './Components/ChatComponent';
import AdminChat from './Components/AdminChat';

const cookies = new Cookies();


const SecretRoute = ({ component: Comp, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return (cookies.get('sessionToken')) ? (
          <Comp {...props} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
};

const AdminRoute = ({ component: Comp, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return (cookies.get('AdminSessionToken')) ? (
          <Comp {...props} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
};

loadProgressBar();
// show progress bar when axios is too slow 

class App extends Component {
  
  componentDidMount() {
    loadReCaptcha();
   
  }



  
  render() {
    
    return (      

      // <div className="wrapper">
      //   <div className="main"> 
      //   <div className="container"> 
      //     <div className="row" >
      <div>
        {/* <Button onClick={this.token}> help </Button> */}
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} lightBackground/>
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
         
              <Route path="/login" component={SignIn}  >
              </Route>
              <Route path="/register" component={RegisterNew}>
              </Route>
              <Route exact path="/" component={LandingPage}>
              </Route>
              <Route path="/admin" component={Admin} >
              </Route>
              <SecretRoute path="/chat" component={ClientChat}></SecretRoute>
              <SecretRoute path="/clientReview" component={ClientReviewTicket}></SecretRoute>
              <SecretRoute path="/dashboard" component={Dashboard} >
              </SecretRoute>
              {/* <Route path="/dashboard" component={Dashboard} >
              </Route> */}
              <AdminRoute exact path="/tickets" component={Tickets}>
              </AdminRoute>
              <AdminRoute path="/reviewTicket" component={ReviewTicketAgain} ></AdminRoute>
              <AdminRoute path="/AdminChat" component={AdminChat}>
              </AdminRoute>
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