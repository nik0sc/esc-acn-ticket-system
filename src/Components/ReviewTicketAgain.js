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
import { Card, CardContent, Grid, FormControl, Select, InputLabel, OutlinedInput, MenuItem, DialogTitle, DialogContent } from '@material-ui/core';
import { CardActions, TextField, Paper } from 'material-ui';
import axios from 'axios';
import logo from '../img/acnapi_logo.png';
import AdminReplyTextField from './AdminReplyTextField';
import {Redirect, NavLink, Route, Switch, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import compose from 'recompose/compose';

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

const status = [
  {
    value: '0',
    label: 'New',
  },
  {
    value: '1',
    label: 'In Progress',
  },
  {
    value: '2',
    label: 'Closed',
  },
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ReviewTicketAgain extends React.Component {
  state = {
    title: '',
    message: '',
    response: '',
    open_time: '',
    priority: '',
    severity: '',
    team: '',
    flag: '',
    status: '0',
    redirect: false,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, function() {
      console.log("CHANGES: " + this.state.team + " " + this.state.status);
    });
  };

  handleClose = () => {
    this.setState({
      redirect: true,
    })
  }

  onChange = e => {
    this.setState({
      response: e.target.value,
    })
  }

  componentDidMount(){
    console.log('review ticket recevied ' + this.props.location.state.currentTicketID);

    axios.get(`https://ticket-service.ticket.lepak.sg/ticket/${this.props.location.state.currentTicketID}`,{
      headers: {
        'X-Parse-Session-Token':  'r:5ab3041d2ff2484950e68251589ec347', 
      }
    })
    .then((res => {
      if(res.request.status === 200){
        console.log('able to receive ticket');
        this.setState({
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

        if(this.state.flag === 0){
          this.setState({
            flag: '-',
          })
        }
        if(this.state.team === null){
          this.setState({
            team: 0,
          });
        }
      }
    }))
  }

  render() {

    const { classes } = this.props;

    if(this.state.redirect){
      this.props.history.push('/tickets');
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

        <div className={classes.root}>
        <Grid container>
          <Grid item xs={8}>
          <Card className="reviewTicketCard">
            <CardContent> 
              <Typography inline>
                {"Ticket #" + this.props.location.state.currentTicketID} 
              </Typography>
              {/* title */}
              <h4>{this.state.title}</h4> 
              {/* message */} 
              <p>{this.state.message}</p>
            </CardContent>
            </Card>
            <AdminReplyTextField onChange={this.onChange.bind(this)}/>
          </Grid>
          


          <Grid item xs={4}>
            <Card className="reviewTicketInfo">
            <CardContent>
              <h5 className="infoTitle"> Contact Information</h5>
              <Divider/>
              <Typography className="guttertop">Full Name: fullname</Typography>
              <Typography>Username: username</Typography>
              <Typography>Email: email</Typography>
              <Typography>Phone Number: phone</Typography>
              <br/>
              <h5 className="infoTitle"> Ticket Information</h5>
              <Divider />
              <Typography className="guttertop">Ticket ID: {this.props.location.state.currentTicketID}</Typography>
              <Typography>Priority: {this.state.priority}</Typography>   
              <Typography>Severity: {this.state.severity}</Typography>         
              {/* <Typography>Categories: </Typography> */}
              <Typography>Date Opened by User: {this.state.open_time.substring(0, 10)}</Typography>
              <Typography>Time Opened by User: {this.state.open_time.substring(11, 19)}</Typography> 
              <Typography>Feedback: {this.state.flag}</Typography>
              <br />
              <h5 className="infoTitle">Admin Actions</h5>
              <Divider />
              <div className="admin-actions">
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-status-simple" >
              Status
            </InputLabel>
            <Select
              value={this.state.status}
              onChange={this.handleChange}
              input={
              <OutlinedInput
                labelWidth={45}
                name="status"
                id="outlined-status-simple"
              />
            }
            >
            <MenuItem value={0}>New</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Closed</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-status-simple" >
              Assigned Team
            </InputLabel>
            <Select
              value={this.state.team}
              onChange={this.handleChange}
              input={
              <OutlinedInput
                labelWidth={110}
                name="team"
                id="outlined-status-simple"
              />
            }
            >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={1}>Billing</MenuItem>
            <MenuItem value={2}>Support</MenuItem>
            <MenuItem value={3}>General Inquiry</MenuItem>
          </Select>
        </FormControl>
        </div>
            </CardContent>
            </Card>
          </Grid>



          
          </Grid>
          </div>
          </div>
    
    );
}}


ReviewTicketAgain.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default compose(
  withRouter,
  withStyles(styles),
)(ReviewTicketAgain);