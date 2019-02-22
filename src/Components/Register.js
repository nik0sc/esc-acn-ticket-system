import React from 'react'
import axios from 'axios'

class Register extends React.Component{

    makeUser = async(e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const email = e.target.elements.email.value;
        const phone = e.target.elements.phone.value;

        if(username && password && email && phone){
          axios.post(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users?username=${username}&email=${email}&password=${password}&phone=${phone}`, {
            headers: {
              'Server-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJnWVppRDZzbzJLcXNMT1hmVUt5TjZpdHVXUXhaQnkyN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2NDksImV4cCI6MTU1MjU0NDY0OSwiYXpwIjoiZ1laaUQ2c28yS3FzTE9YZlVLeU42aXR1V1F4WkJ5MjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.uSISsVSh1REzY3UuMWm_QTEd4xs10cqoWtQpHj3xz9HhKx1_N0s4Wj7A-rQRsQJzQ12IiB5A05lQ17DdkaQkfi_4zeNTGQTo3MvE9Glf1wfcWCMe2WAPr78GSL0RQKuyKZpwrlFuxNghN_-sEVrG4gI7VZyWEc6S_m2076TXVPigTF29u9dA6NgzQkVRaqssulgO_SaZtG9mFwAJ19CaQluqrx10GHsd6OKN2YXPzvSBFa2ouUHlncePbgtKsOl660MQFnyTGtLTzYZPJRX7mpTHSSb4RWoY45lwtt5vfV0HwSC84nKyZvfkK6frFZkpltfSjiWRo6R62lzt5r1dcw',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }  // backend needs to use CORS
          })
          .then((res) => {
            console.log(res)
          }
          )
        }
      }

    render(){
        return(
            <form onSubmit={this.makeUser} >
                <input type="text" name="username" placeholder="Put a username" />
                <input type="text" name="email" placeholder="Put your email" />
                <input type="text" name="password" placeholder="Put your pass" />
                <input type="text" name="phone" placeholder="Put your phone" />


                <button> Register </button>
            </form>
        )
    }
}

// export default Register;



    // constructor() {
    //     super();

    //     this.state = {
    //         email: '',
    //         password: '',
    //         name: '',
    //     };

    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // handleChange(e) {
    //     let target = e.target;
    //     let value = target.type === 'checkbox' ? target.checked : target.value;
    //     let name = target.name;

    //     this.setState({
    //       [name]: value
    //     });
    // }

    // handleSubmit(e) {
    //     e.preventDefault();

    //     console.log('The form was submitted with the following data:');
    //     console.log(this.state);
    // }



//     render() {
//         return (
//         <div>
//             <form onSubmit={this.makeUser}>
//               <div >
//                 <input type="text" name="username" placeholder="Enter your full name" value={this.state.name}/>
//               </div>
//               <div >
//                 <input type="password" name="password" placeholder="Enter your password" value={this.state.password}/>
//               </div>
//               <div>
//                   <button>Sign Up</button> <Link to="/sign-in">I'm already member</Link>
//               </div>
//             </form>
//           </div>
//         );
//     }
// }

export default Register;
