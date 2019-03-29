import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, ListSubheader, AppBar, Toolbar, FormControl, InputLabel, Input } from '@material-ui/core';
import FormDialog from "./FormDialog";
import axios from 'axios'
import { TextField, Paper } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TestWillDelete from './TestWillDelete';


const styles = {
  root:{
    width: '100%',
    backgroundColor: '#FFFFFF',

  },
  card: {   
    minWidth: 275,
    margin: 20,
    height: 500,
    
  },
  title: {
    fontSize: 14,
  },
 
menu: {
  margin: 20,
  minWidth: 275,
},

stats: {
  margin: 20,
  minWidth: 275,
  height: 200,

},

number:{
  display: 'flex',
  margin: 20,
},

};

class SimpleCard extends React.Component{

  state= {
    id: [],
    status: [],
    redirect: false,
    open: false,
    title: '',
    ticketid: '',
    open_time:'',
    assigned_team: '',
    message: '',

  };

  componentDidMount(){
    axios.get(`https://esc-ticket-service.lepak.sg/ticket/byUser`,{
      headers: {
        'X-Parse-Session-Token': 'r:85d020c6dbeb6a0680bca1c96487b6ce'
      }
    })
    .then((res) => {
      if(res.request.status === 200){
        //console.log(res.data);
        this.setState({id: res.data.map((data => {return([data.id, data.priority, data.title])}))})
        console.log(this.state);
      }
    })
    .catch(error => {
      console.log('failed')
    })
  }

  _renderItems(){
    return this.state.id.map((el, i) => 
        <ListItem button onClick={this.handleClick.bind(this, el[0])} key={i}>
          <ListItemText primary={'Ticket ' + el[0] + ': ' + el[2]} secondary={'Progress: ' + el[1]}>
          </ListItemText>
        </ListItem>
      )
    }

    handleClick = (id, e) => {
      this.setState({
        redirect: true,
        open: true,
      })
      axios.get(`https://esc-ticket-service.lepak.sg/ticket/${id}`,{
        headers:{
          'X-Parse-Session-Token': 'r:85d020c6dbeb6a0680bca1c96487b6ce'
        }
      })
      .then((res => {
        this.setState({
          title: res.data.title,
          ticketid: res.data.id,
          open_time: res.data.open_time,
          assigned_team: res.data.assigned_team,
          message: res.data.message,
        })
        
        if(this.state.assigned_team === null){
          this.setState({
            assigned_team: "Currently not assigned",
          })
        }
        var date = this.state.open_time;
        var newDatee = date.substring(0, 16).replace("T", " @ ");
        this.setState({
          open_time: newDatee,
        })
      }))
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    renderElement(){
      if(this.state.redirect)
         return (<Dialog
         fullScreen
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="form-dialog-title"
       >
       <AppBar className="appbar">
            <Toolbar >
              <Typography variant="h6" color="inherit" className="flex">
              {'Ticket #' + this.state.ticketid + " - " + this.state.title}
              </Typography>
              <Button color="inherit" onClick={this.handleClose} className="button">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <MuiThemeProvider>
          <Card className="space">
      <CardContent>
        <h4 gutterBottom>Ticket Information</h4>
        <Divider/>
        <Typography className="guttertop">
          Date Opened: {this.state.open_time}
        </Typography>
        <Typography >
          Assigned Team: {this.state.assigned_team}
        </Typography>
        <Typography >
          {/* Your query: {this.state.message} */}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
       */}
    </Card>
    <Card className="space1">
<CardContent>
  <h4>Your Query</h4>
  <Divider />
  <Typography className="guttertop">
        {this.state.message}
  </Typography>
</CardContent>

    </Card>
          </MuiThemeProvider>
          
       </Dialog>);
   }

  render(){
    const { classes } = this.props;

    return(
      <Grid container spacing = {0} >
      {this.renderElement()}
        <Grid item xs= {12} sm={6}>
        <Card className={classes.card}>
      <CardContent>
        <List style={{maxHeight: 500, overflow: 'auto', margin:0, padding: 0,}}>
        <ListSubheader className={classes.root}> 
          <ListItemText>
              <h3>Tickets</h3>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
              style = {{backgroundColor: 'transparent'}}
              >
                <FormDialog />
              </IconButton>
            </ListItemSecondaryAction>
            <Divider />
          </ListSubheader>
          {/* <ListItem>  
            
            </ListItem> */}
          <div>
                {this._renderItems()}
            </div> 
</List>

      </CardContent>
    </Card>
        </Grid>
        <Grid item xs = {12} sm = {6}>
        <Card className={classes.menu}>
            <CardContent>
              <Typography variant="h5">
              Welcome to Accenture's ticket system
              </Typography>
            </CardContent>
        </Card> 
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5"> 
                Live Chat
            </Typography>
            <Divider />
            </CardContent>
        </Card>
        

    
        
        </Grid>
        


      </Grid>

    )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleCard);
