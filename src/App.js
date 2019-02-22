// import React, { Component } from 'react';
// import Form from './Components/Form'
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Register from './Components/Register'


// class App extends Component {
  
//   render() {
//     return (
//       <Router>
//       <div className="App">
//       <Switch>
//       <Route exact path="/" Component={Form} ></Route>
//       <Route path="/signin" Component={Register}></Route>
//       </Switch>
//       </div>
//       </Router>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Register from './Components/Register'
import Form from './Components/Form';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/" component={Register}>
              </Route>
              <Route path="/sign-in" component={Form}  >
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;