import React from 'react';
import { AppBar, Typography, Button, Card } from '@material-ui/core';
import { Toolbar, CardMedia } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ButtonAppBar from './ButtonAppBar';
import LandingAppBar from './LandingAppBar';
import bg from '../img/download.jpg';
import {withRouter} from 'react-router-dom'


class LandingPage extends React.Component {

    handleClickLogin = () => {
        this.props.history.push('/login')
    }

    handleClickRegister = () => {
        this.props.history.push('/register')
    }

    render(){
        
        return(
            <div>
                <LandingAppBar/>

                <img src={bg} className="test" alt="teamwork"/> 


                <h2 className="text1"> Welcome to acn<span class="separator">api</span></h2>
                <h2 className="text3">ticket system.</h2>

                <Button variant="contained" size="large" style={{marginLeft: 150, minHeight: 60, minWidth: 200, 
                    justifyContent: 'center', borderRadius: 140, outline: 'none', backgroundColor: '#F9C03E', fontSize: 20,
                    fontWeight:'bold', color: 'white', textTransform: 'none',
                    }} onClick={this.handleClickLogin}>Sign In</Button>
                    
                <Button variant="outlined" size="large" style={{marginLeft: 20, minHeight: 60, minWidth: 200, 
                justifyContent: 'center', borderRadius: 140, outline: 'none', fontSize: 20,
                fontWeight:'bold', color: 'white', borderColor: 'white', textTransform: 'none', borderWidth: 'medium',
                }} onClick={this.handleClickRegister}>Register</Button>

                


            </div>
        )
    }

}

export default withRouter(LandingPage);