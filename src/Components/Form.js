import React from 'react'
import axios from 'axios'


class Form extends React.Component{

    getUser = async(e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        if(username && password){
          axios.get(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login?username=${username}&password=${password}`, {
            headers: {
              'Server-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJnWVppRDZzbzJLcXNMT1hmVUt5TjZpdHVXUXhaQnkyN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2NDksImV4cCI6MTU1MjU0NDY0OSwiYXpwIjoiZ1laaUQ2c28yS3FzTE9YZlVLeU42aXR1V1F4WkJ5MjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.uSISsVSh1REzY3UuMWm_QTEd4xs10cqoWtQpHj3xz9HhKx1_N0s4Wj7A-rQRsQJzQ12IiB5A05lQ17DdkaQkfi_4zeNTGQTo3MvE9Glf1wfcWCMe2WAPr78GSL0RQKuyKZpwrlFuxNghN_-sEVrG4gI7VZyWEc6S_m2076TXVPigTF29u9dA6NgzQkVRaqssulgO_SaZtG9mFwAJ19CaQluqrx10GHsd6OKN2YXPzvSBFa2ouUHlncePbgtKsOl660MQFnyTGtLTzYZPJRX7mpTHSSb4RWoY45lwtt5vfV0HwSC84nKyZvfkK6frFZkpltfSjiWRo6R62lzt5r1dcw'
            }
          })
          .then((res) => {
            console.log(res)
          }
          )
        }
      }
      
    render(){
        return(
            <form onSubmit={this.getUser}>
                <input type="text" name="username" placeholder="Username" />
                <input type="text" name="password" placeholder="Password" />
                <button> Login </button>
            </form>
        )
    }
}

export default Form;


// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class Form extends Component {
//     constructor() {
//         super();

//         this.state = {
//             email: '',
//             password: ''
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         let target = e.target;
//         let value = target.type === 'checkbox' ? target.checked : target.value;
//         let name = target.name;

//         const username = e.target.elements.name.value;
//         const password = e.target.elements.password.value;
//         if(username && password){

//             this.setState({
//                 email: this.state.username,
//                 password: this.state.password
//               });

//         }

    
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//         console.log('The form was submitted with the following data:');
//         console.log(this.state);
//     }

//     render() {
//         return (
//         <div>
//             <form onSubmit={this.handleSubmit}>
//             <div>
//                 <label>Name</label>
//                 <input type="email" id="name" placeholder="Enter your email" name="name" value={this.state.name} onChange={this.handleChange} />
//               </div>
//               <div>
//                 <label>Password</label>
//                 <input type="password" id="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
//               </div>

//               <div>
//                   <button>Sign In</button> <Link to="/">Create an account</Link>
//               </div>
//             </form>
//           </div>
//         );
//     }
// }

// export default Form;