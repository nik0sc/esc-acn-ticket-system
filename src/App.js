import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Register from './Components/Register'
import Form from './Components/Form';
import Admin from './Components/Admin';

import './App.css';
import Dashboard from './Components/Dashboard';
import ButtonAppBar from './Components/ButtonAppBar';

class App extends Component {
  
  render() {
    return (
      // <div className="wrapper">
      //   <div className="main"> 
      //   <div className="container"> 
      //     <div className="row" >
      <div>
          
          <Router>

            
          <div className="App">
     

              {/* <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div> */}

              <Route path="/register" component={Register}>
              </Route>
              <Route exact path="/" component={Form}  >
              </Route>
              <Route path="/admin" component={Admin} >
              </Route>
              <Route path="/dashboard" component={Dashboard} >
              </Route>
          
          </div>

        </Router>

  
          </div>

      // </div>
      //   </div>       
      // </div>

    );
  }
}

export default App;