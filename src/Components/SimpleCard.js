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
import CommentExampleReplyFormOuter from './CommentExampleReplyFormOuter';
import Cookies from 'universal-cookie';
import AdminReplyTextField from './AdminReplyTextField';
import ChatComponent from "./ChatComponent";

const styles = {
  root:{
    width: '100%',
    backgroundColor: '#FFFFFF',

  },
  gap: {
    marginTop: 10,
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
welcome: {
  fontWeight: 'bold',
  
}

};

class SimpleCard extends React.Component{

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     numOfTicketsOpened: '',
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }

  state= {
    id: [],
    status: [],
    redirect: false,
    open: false,
    title: '',
    ticketid: '',
    assigned_team: '',
    message: '',
    disabledGood: false,
    disabledBad: false,
    redirectConfirm: false,

  };

  axiosFunc = () => {
    const cookies = new Cookies();
    const CurrentSessionToken = cookies.get('sessionToken');
    console.log('current session token ' + CurrentSessionToken);

    //get user
    axios.get(`https://user-service.ticket.lepak.sg/user/me`, {
      headers: {
        'X-Parse-Session-Token': CurrentSessionToken,
      }
    })
    .then((res) => {
      if(res.request.status === 200){
        this.setState({
          fullName: res.data.long_name,
          username: res.data.username
        })
        console.log(res.data);
        if(res.data.user_type !== 1){
          this.setState({is_admin: true});
        }else{
          this.setState({is_admin: false});
        }
      }
    });
    


    // get ticket
    axios.get(`https://ticket-service.ticket.lepak.sg/ticket/byUser`,{
      headers: {
        'X-Parse-Session-Token': 'r:f6540c5b28522ed9d6a93c6e13fb31bc'
      }
    })
    .then((res) => {
      if(res.request.status === 200){
        console.log("get tickets" + res.data);


        //todo: check if there are tickets and show no tickets are created 
        this.setState({
          id: res.data.map((data => {return([data.id, data.priority, data.title])})),
        })
        let editData = [...this.state.id];

        for(var i=0; i < editData.length; i++){
          if(editData[i][1] === 0){
            editData[i][1] = "New";
          }
          if(editData[i][1] === 1){
            editData[i][1] = "In Progress";
          }
          if(editData[i][1] === 2){
            editData[i][1] = "Closed";
          }

          //this is temp, pls remove after since no status in API call 
          if(editData[i][1] === 3){
            editData[i][1] = "New";
          }
        }
        this.setState({
          id: editData,
        });

      }
    })
    .catch(error => {
      console.log('failed')
    })

  }

  componentDidMount(){

    this.axiosFunc();
    //this.interval = setInterval(this.axiosFunc, 10000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("checking if chat should be constructed");
    if((this.state.username !== undefined) && (this.state.is_admin !== undefined) && (this.state.chatwidget === undefined)) {
      this.setState({chatwidget: <ChatComponent username={this.state.username} isAdmin={this.state.is_admin}/>})
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  onChange = e => {
    this.setState({
      response: e.target.value,
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

  // componentDidUpdate(prevProps ,prevState){
  //   const {numOfTicketsOpened} = this.state.numOfTicketsOpened;
  //   if(numOfTicketsOpened !== prevState.numOfTicketsOpened){
  //     console.log("UPDATED COMPOENENT")
  //   }
  // }


    handleClick = (id, e) => {
      console.log('current id selected: ' + id);
      this.setState({
        redirect: true,
        open: true,
      })
      axios.get(`https://ticket-service.ticket.lepak.sg/ticket/${id}`,{
        headers:{
          'X-Parse-Session-Token': 'r:5ab3041d2ff2484950e68251589ec347'
        }
      })
      .then((res => {
        if(res.request.status === 200){
          this.setState({
            title: res.data.title,
            ticketid: res.data.id,
            open_time: res.data.open_time,
            assigned_team: res.data.assigned_team,
            message: res.data.message,
            priority: res.data.priority,
            severity: res.data.severity,
  
            
             // TODO: add status, flag 
  
          })

          if(this.state.assigned_team === null){
            this.setState({
              assigned_team: "Currently not assigned",
            })
        var date = this.state.open_time;
        var openDate = date.substring(0, 10);
        var openTime = date.substring(11, 16);
        this.setState({
          open_date: openDate,
          open_time: openTime,
        })
      }
        }
         
      }))
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false 
      });
      window.location.reload();
    };

    handleHelpfulClick = (e) => {
      this.setState({
        disabledGood: true, 
        disabledBad: false,
      })
    };
    
    handleNotHelpfulClick = (e) => {
      this.setState({
        disabledGood: false, 
        disabledBad: true,
      })
    };

    renderElement(){
      if(this.state.redirect)
         return (<Dialog
         fullScreen
         open={this.state.open}
         onClose={this.handleClose}
         aria-labelledby="form-dialog-title"
       >
       <AppBar position="static" style={{backgroundColor: '#000000'}}>
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
            <AdminReplyTextField onChange={this.onChange.bind(this)}/>
            <Button size="medium" variant="contained" disabled={this.state.disabledGood}
            style={{backgroundColor: '#81DF44', marginLeft: 30, outline: 'none',
          borderRadius: 10, fontWeight: 'bold', textTransform: 'none', boxShadow:'none',}}
            onClick={this.handleHelpfulClick}>Helpful</Button>
            <Button variant="contained" size="medium" disabled={this.state.disabledBad} 
            style={{backgroundColor: '#E34D4C', marginLeft: 10, outline:'none', 
            borderRadius: 10, fontWeight: 'bold', textTransform:'none', 
            boxShadow:'none',}} onClick={this.handleNotHelpfulClick}
            > Not Helpful</Button>
            
          </Grid>


          <Grid item xs={4}>
            <Card className="reviewTicketInfoClient">
            <CardContent>
              <h5 className="infoTitle">Ticket Information</h5>
              <Divider/>
              <Typography className="guttertop">
              Date Opened: {this.state.open_date} </Typography>
              <Typography>
              Time Opened: {this.state.open_time} </Typography>
              <Typography> Assigned Team: {this.state.assigned_team} </Typography>
              <Typography> Priority: waitin' for API</Typography>
              <Typography> Severity: waitin' for API</Typography>      
                <Typography> Progress: New </Typography>
                <br/>
                {/* <h5 className="infoTitle">Your Actions</h5>
                <Divider /> */}
                  
            </CardContent>
            </Card>
          </Grid>
        </Grid>
          </MuiThemeProvider>
          
       </Dialog>);
   }

  render() {
    const {classes} = this.props;

    //render() is called before componentDidMount() and axiosFunc(), so this.state.fullName is undefined at this point.
    console.log("simplecard render event");

    return(
      <Grid container spacing = {0} >
      {this.renderElement()}
        <Grid item xs= {12} sm={6}>
        <Card className={classes.card}>
      <CardContent>
        <List style={{maxHeight: 500, overflow: 'auto', margin:0, padding: 0,}}>
        <ListSubheader className={classes.root}> 
          <ListItemText>
              <h3 className="same-line">Tickets</h3>
            </ListItemText>
            <ListItemSecondaryAction>
              <FormDialog/>
            </ListItemSecondaryAction>
            <Divider className={classes.gap}/>
          </ListSubheader>
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
              <Typography variant="h5" className={classes.welcome}>
              {/* Welcome to Accenture's ticket system */}
              Welcome Back, {this.state.fullName}
              </Typography>
            </CardContent>
        </Card> 
        <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5"> 
                Live Chat
            </Typography>
            {this.state.chatwidget}
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
