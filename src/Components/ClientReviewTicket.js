import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Card, CardContent, Grid, FormControl, Select, InputLabel, OutlinedInput, MenuItem, DialogTitle, DialogContent, Tooltip } from '@material-ui/core';
import { CardActions, TextField, Paper } from 'material-ui';
import axios from 'axios';
import logo from '../img/acnapi_logo.png';
import AdminReplyTextField from './AdminReplyTextField';
import {Redirect, NavLink, Route, Switch, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
const CurrentSessionToken = cookies.get('sessionToken');


const styles = (theme) => ({
  appBar: {
    position: 'static',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140,
  },
  title: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  save:{
    position: 'absolute',
    fontWeight: 'bold',
    color:'#F9C03E',
    outline: 'none',
    fontSize: 18,
    marginLeft: 1150,
  },
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ClientReviewTicket extends React.Component {
  state = {
    id: '',
    title: '',
    message: '',
    response: '',
    open_time: '',
    priority: '',
    severity: '',
    team: '',
    date_open:'',
    time_open: '',
    redirect: false,
    flag: '',
    
  }

  componentDidMount(){
    console.log('review ticket recevied ' + this.props.location.state.currentTicketIDClient);

    axios.get(`https://ticket-service.ticket.lepak.sg/ticket/${this.props.location.state.currentTicketIDClient}`,{
      headers: {
        'X-Parse-Session-Token':  CurrentSessionToken, 
      }
    })
    .then((res => {
      if(res.request.status === 200){
        console.log('able to receive ticket');
        this.setState({
          res: res.data.id,
          title: res.data.title,
          message: res.data.message,
          response: res.data.response,
          open_time: res.data.open_time,
          priority: res.data.priority,
          severity: res.data.severity,
          team: res.data.assigned_team,
          flag: res.data.status_flag,

          // add status(progress)
          
        })
        if(this.state.response === null){
            this.setState({
                response: "Admin has not replied yet."
            })
        }
        if(this.state.team === null){
            this.setState({
                team: 'None',
            })
        }
        if(this.state.priority === 1){
            this.setState({
                priority: 'Low',
            })
        }
        if(this.state.priority === 2){
            this.setState({
                priority: 'Medium',
            })
        }
        if(this.state.priority === 3){
            this.setState({
                priority: 'High',
            })
        }
        if(this.state.severity === 1){
            this.setState({
                severity: 'Low',
            })
        }
        if(this.state.severity === 2){
            this.setState({
                severity: 'Medium',
            })
        }
        if(this.state.severity === 3){
            this.setState({
                severity: 'High',
            })
        }
        if(this.state.flag === 0){
            this.setState({
                flag: 'New',
            })
        }
        if(this.state.flag === 1){
            this.setState({
                flag: 'In Progress',
            })
        }
        if(this.state.flag === 2){
            this.setState({
                flag: 'Insufficient',
            })
        }
        if(this.state.flag === 3){
            this.setState({
                flag: 'Closed',
            })
        }
    }
    }))
    }

    handleHelpfulClick = (e) => {
        this.setState({
          disabledGood: true, 
          disabledBad: false,
          flag: "Closed",
        })
        
      };
      
      handleNotHelpfulClick = (e) => {
        this.setState({
          disabledGood: false, 
          disabledBad: true,
          flag: "Insufficient Response",
        })
      };

    handleClose = () => {

        // change string flag back into integer flag
        axios.put(`https://ticket-service.ticket.lepak.sg/ticket/${this.props.location.state.currentTicketIDClient}/protected`,{
            status_flag: this.state.flag,
        },{
            headers: {
                'X-Parse-Session-Token':  CurrentSessionToken, 
            }
        })
        console.log('client updated flag successfully')
        this.setState({
            redirect: true,
        })
    }
    

  render() {

    const { classes } = this.props;

    if(this.state.redirect){
      this.props.history.push('/dashboard');
    }   


    return (
      <div>
           <AppBar className="appbar" style={{backgroundColor: '#000000'}} >
            <Toolbar>
              <img src={logo} width='100px' height='40px' alt="teamwork" />
              <Typography variant="h6" color="inherit" className={classes.title}>
                Review Ticket
              </Typography>
              <Button color="inherit" className={classes.save} onClick={this.handleClose}>
                Save
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container>
          <Grid item xs={8}>
            <Card className="reviewTicketCardClient">
            <CardContent> 
                <h5>{this.state.title}</h5>
              <Typography >
                {this.state.message}
              </Typography>
            </CardContent>
            </Card>
            
            <Card className="clientAdminReplyCard">
              <CardContent>
                <h5 className="infoTitle">Admin's Reply</h5>
                <Divider />
                <Typography className="guttertop">{this.state.response}</Typography>

              </CardContent>
            </Card>
            
          </Grid>

          <Grid item xs={4}>
            <Card className="reviewTicketInfoClient">
            <CardContent>
              <h5 className="infoTitle">Ticket Information</h5>
              <Divider/>
              <Typography className="guttertop">
              Date Opened: {this.state.open_time.substring(0,10)} </Typography>
              <Typography>
              Time Opened: {this.state.open_time.substring(11, 19)} </Typography>
              <Typography> Assigned Team: {this.state.team} </Typography>
              <Typography> Priority: {this.state.priority}</Typography>
              <Typography> Severity: {this.state.severity}</Typography>      
              <Typography> Progress: {this.state.flag} </Typography>
                <br/>                  
            </CardContent>
            </Card>

            <Card className="clientUserActions">
                <CardContent>
                    <h5 className="infoTitle">User's Actions</h5>
                    <Divider />
                    <Tooltip disableFocusListener disableTouchListener title="By selecting 'helpful', you
                    are satisifed with our response and you are ready to close this ticket!">
                    <Button size="medium" variant="contained" disabled={this.state.disabledGood}
            style={{backgroundColor: '#81DF44', marginLeft: 70, outline: 'none',
          borderRadius: 10, fontWeight: 'bold', marginTop: 20, textTransform: 'none', boxShadow:'none',}}
            onClick={this.handleHelpfulClick}>Helpful</Button>
            </Tooltip>
            <Tooltip disableFocusListener disableTouchListener title="By selecting 'not helpful', you are not
            satisfied with our responses. This means you can contact us through live chat, or we'll contact you
            through email for more information.">
            <Button variant="contained" size="medium" disabled={this.state.disabledBad} 
            style={{backgroundColor: '#E34D4C', marginTop: 20,marginLeft: 30, outline:'none', 
            borderRadius: 10, fontWeight: 'bold', textTransform:'none', 
            boxShadow:'none',}} onClick={this.handleNotHelpfulClick}
            > Not Helpful</Button>            
            </Tooltip>

                    

                </CardContent>
            </Card>
          </Grid>
        </Grid>
        </div>
    
    );
}}


ClientReviewTicket.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default compose(
  withRouter,
  withStyles(styles),
)(ClientReviewTicket);
