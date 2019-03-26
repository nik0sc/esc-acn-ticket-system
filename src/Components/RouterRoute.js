// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import Admin from './Admin';
// import Tickets from './Tickets'
// import Dashboard from './Dashboard';
// import ButtonAppBar from './ButtonAppBar';
// import SignIn from './SignIn'
// import RegisterNew from './RegisterNew';
// import { ToastContainer } from 'react-toastify';
// import { loadReCaptcha } from 'react-recaptcha-google'
// import {Link,Redirect, Switch} from 'react-router-dom';
// import Cookies from 'universal-cookie';

// const AuthService = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       this.isAuthenticated = true
//       setTimeout(cb, 100)
//     },
//     logout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 100)
//     }
//   };

// const SecretRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         AuthService.isAuthenticated === 'true'
//         ? <Component {...props} />
//         : <Redirect to='/' />
//     )} />
//   );

// class RouterRoute extends React.Component {

//     render(){
//         return(
//             <Router>
//             <Switch>

//           <div className="App">
//           <div className="App_Aside"></div>
//           <div className="App_Form" >
//           <Route path="/register" component={RegisterNew}>
//               </Route>
//               <Route exact path="/" component={SignIn}  >
//               </Route>
//               <Route path="/admin" component={Admin} >
//               </Route>
//               <SecretRoute path="/dashboard" component={Dashboard} >
//               </SecretRoute>
//               {/* <Route path="/dashboard" component={Dashboard} >
//               </Route> */}
//               <Route path="/tickets" component={Tickets}>
//               </Route>
//               {/* <Route render={() => (<div> 404 </div>)} /> */}
//               </div>
//           </div>
//           </Switch>
//         </Router>
//         )
//     }
// }


// export default RouterRoute;