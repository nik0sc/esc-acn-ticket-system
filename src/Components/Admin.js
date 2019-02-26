import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class Admin extends React.Component{
  
  state = {
    redirect: false
  }

    getAdmin = async(e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        if(email && password){
          axios.get(`https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login?email=${email}&password=${password}`, {
            headers: {
              'Server-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJnWVppRDZzbzJLcXNMT1hmVUt5TjZpdHVXUXhaQnkyN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2NDksImV4cCI6MTU1MjU0NDY0OSwiYXpwIjoiZ1laaUQ2c28yS3FzTE9YZlVLeU42aXR1V1F4WkJ5MjciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.uSISsVSh1REzY3UuMWm_QTEd4xs10cqoWtQpHj3xz9HhKx1_N0s4Wj7A-rQRsQJzQ12IiB5A05lQ17DdkaQkfi_4zeNTGQTo3MvE9Glf1wfcWCMe2WAPr78GSL0RQKuyKZpwrlFuxNghN_-sEVrG4gI7VZyWEc6S_m2076TXVPigTF29u9dA6NgzQkVRaqssulgO_SaZtG9mFwAJ19CaQluqrx10GHsd6OKN2YXPzvSBFa2ouUHlncePbgtKsOl660MQFnyTGtLTzYZPJRX7mpTHSSb4RWoY45lwtt5vfV0HwSC84nKyZvfkK6frFZkpltfSjiWRo6R62lzt5r1dcw'
            }
          })
          .then((res) => {
            console.log(res)
            this.setState= {
              redirect:true
            }
          }
          )
        }
      }
      
    render(){
      if(this.state.redirect){
        return <Redirect to="/tickets" />
      }
        return(
            <form onSubmit={this.getAdmin}>
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="password" placeholder="Password" />
                <button> Login </button>
            </form>
        )
    }
}

export default Admin;
