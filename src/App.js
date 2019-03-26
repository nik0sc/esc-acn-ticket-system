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
              <Route path="/register" component={RegisterNew}>
              </Route>
              <Route exact path="/" component={SignIn}  >
              </Route>
              <Route path="/admin" component={Admin} >
              </Route>
              <Route path="/dashboard" component={Dashboard} >
              </Route>
              <Route path="/tickets" component={Tickets}>
              </Route>
              </div>
          </div>
        </Router>
          </div>
    );
  }
}

export default App;