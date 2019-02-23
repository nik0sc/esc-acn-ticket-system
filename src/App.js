import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Register from './Components/Register'
import Form from './Components/Form';
import Admin from './Components/Admin';

import './App.css';
import Dashboard from './Components/Dashboard';

class App extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <div className="main"> 
        <div className="container"> 
          <div className="row" >
          
          <div className="col-sm-4 title-container">
            <h1>hello</h1> 
          </div>
          <div className="col-sm-8 form-container">
          <Router>

            
          <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              {/* <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div> */}

              <Route path="/register" component={Register}>
              </Route>
              <Route path="/sign-in" component={Form}  >
              </Route>
              <Route path="/admin" component={Admin} >
              </Route>
          
          </div>

        </div>
        </Router>

      </div>
          </div>

      </div>
        </div>       
      </div>

    );
  }
}

export default App;