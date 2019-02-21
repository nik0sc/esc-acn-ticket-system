import React from 'react'

class Form extends React.Component{
    render(){
        return(
            <form onSubmit={this.props.getUser}>
                <input type="text" name="username" placeholder="Username" />
                <input type="text" name="password" placeholder="Password" />
                <button> Login </button>
                <button> Register </button>
            </form>
        )
    }
}

export default Form;