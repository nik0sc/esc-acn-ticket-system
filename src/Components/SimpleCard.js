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
import Cookies from 'universal-cookie';
import AdminReplyTextField from './AdminReplyTextField';
import ChatComponent from "./ChatComponent";
import compose from 'recompose/compose';
import {Redirect, NavLink, Route, Switch, Link, withRouter} from 'react-router-dom'

const cookies = new Cookies();
const CurrentSessionToken = cookies.get('sessionToken');

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
    height: '80vh',
    
  },
  title: {
    fontSize: 14,
  },
 
menu: {
  margin: 20,
  minWidth: 275,
  height: "80vh",
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
    redirectConfirm: false,
    currentTicketPriority: '',
    currentTicketSeverity: '',
    redirectReview: false,
    flag: '',
    currentTicketID: '',
    newTicketCount: 0,
    progressTicketCount: 0,
    closedTicketCount: 0,

 
    // progress, flag


  };

  axiosFunc = () => {
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
          username: res.data.username,
        })
        if(res.data.user_type !== 1){
          this.setState({is_admin: true});
        }else{
          this.setState({is_admin: false});
        }
      }
    })
  
    // get all ticket by that user 
    axios.get(`https://ticket-service.ticket.lepak.sg/ticket/byUser`,{
      headers: {
        'X-Parse-Session-Token': CurrentSessionToken,
      }
    })
    .then((res) => {
      if(res.request.status === 200){
        console.log("get tickets" + res.data);
        //todo: check if there are tickets and show no tickets are created 
        this.setState({
          id: res.data.map((data => {return([data.id, data.priority, data.title, data.status_flag])})),
        })
        console.log("REEEE" + this.state.id);
        console.log(this.state.allTickets)


        let editData = [...this.state.id];
        console.log("editData: " + editData);

        for(var i=0; i < editData.length; i++){
          if(editData[i][3] === 0){
            editData[i][3] = "New";
            this.setState({
              newTicketCount: this.state.newTicketCount + 1,
            })
          }
          if(editData[i][3] === 1){
            editData[i][3] = "Waiting for your response";
            this.setState({
              progressTicketCount: this.state.progressTicketCount + 1,
            })
          }
          if(editData[i][3] === 2){
            editData[i][3] = "Response Insufficient";
            this.setState({
              progressTicketCount: this.state.progressTicketCount + 1,
            })
          }
          if(editData[i][3] === 3){
            editData[i][3] = "Closed";
            this.setState({
              closedTicketCount: this.state.closedTicketCount + 1,
            })
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


  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("checking if chat should be constructed");
  //   console.log(this.state);
  //   if((this.state.username !== undefined) && (this.state.is_admin !== undefined) && (this.state.chatwidget === undefined)) {
  //     console.log("constructing chat");

  //     this.setState({
  //       chatwidget: <ChatComponent username={this.state.username} isAdmin={this.state.is_admin}/>
  //     })
  //   }
  // }


  
  onChange = e => {
    this.setState({
      response: e.target.value,
    })
  }


  _renderItems(){
    // return this.state.id.map((el, i) => 
    return this.state.id.map((el, i) => 
        <ListItem button onClick={this.handleClick.bind(this, el[0])} key={i}>
          <ListItemText primary={'Ticket ' + el[0] + ': ' + el[2]} secondary={'Progress: ' + el[3]}>
          </ListItemText>
        </ListItem>
      )
      
    }


    handleClick = (id, e) => {

      console.log('current id selected: ' + id);
      this.setState({
        redirect: false,  // change this back 
        open: true,
        redirectReview: true,
        currentTicketID: id,
      }, function(){
        console.log('current ticket id state: ' + this.state.currentTicketID);
      });

      axios.get(`https://ticket-service.ticket.lepak.sg/ticket/${id}`,{
        headers:{
          'X-Parse-Session-Token': CurrentSessionToken,
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
            response: res.data.response,
  
            
             // TODO: add flag 
  
          })

          

          

          if(this.state.assigned_team === null){
            this.setState({
              assigned_team: "Currently not assigned",
            })

            if(this.state.response === null){
              this.setState({
                response: "Admin have not replied yet."
              })
            }

            
           

            console.log("HELLPP" +  this.state.response);
      
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
      this.setState({ 
        open: false 
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
    //   if(this.state.redirect)
    //      return (<Dialog
    //      fullScreen
    //      open={this.state.open}
    //      onClose={this.handleClose}
    //      aria-labelledby="form-dialog-title"
    //    >
    //    <AppBar position="static" style={{backgroundColor: '#000000'}}>
    //         <Toolbar >
    //           <Typography variant="h6" color="inherit" className="flex">
    //           {'Ticket #' + this.state.ticketid + " - " + this.state.title}
    //           </Typography>
    //           <Button color="inherit" onClick={this.handleClose} className="button">
    //             Close
    //           </Button>
    //         </Toolbar>
    //       </AppBar>
    //       <MuiThemeProvider>
    // <Grid container>
    //       <Grid item xs={8}>
    //         <Card className="reviewTicketCardClient">
    //         <CardContent> 
    //             <h5>{this.state.title}</h5>
    //           <Typography >
    //             {this.state.message}
    //           </Typography>
    //         </CardContent>
    //         </Card>
            
    //         <Card className="clientAdminReplyCard">
    //           <CardContent>
    //             <h6>Admin's Reply</h6>

    //             <h3>{this.state.response}</h3>


          
    //           </CardContent>
    //         </Card>
            
    //       </Grid>


        //   <Grid item xs={4}>
        //     <Card className="reviewTicketInfoClient">
        //     <CardContent>
        //       <h5 className="infoTitle">Ticket Information</h5>
        //       <Divider/>
        //       <Typography className="guttertop">
        //       Date Opened: {this.state.open_date} </Typography>
        //       <Typography>
        //       Time Opened: {this.state.open_time} </Typography>
        //       <Typography> Assigned Team: {this.state.assigned_team} </Typography>
        //       <Typography> Priority: {this.state.priority}</Typography>
        //       <Typography> Severity: {this.state.severity}</Typography>      
        //       <Typography> Progress: New </Typography>
        //         <br/>
        //         {/* <h5 className="infoTitle">Your Actions</h5>
        //         <Divider /> */}
                  
        //     </CardContent>
        //     </Card>

        //     <Card className="clientUserActions">
        //         <CardContent>
        //             <h5 className="infoTitle">User's Actions</h5>
        //             <Divider />
                    
        //             <Button size="medium" variant="contained" disabled={this.state.disabledGood}
        //     style={{backgroundColor: '#81DF44', marginLeft: 70, outline: 'none',
        //   borderRadius: 10, fontWeight: 'bold', marginTop: 20, textTransform: 'none', boxShadow:'none',}}
        //     onClick={this.handleHelpfulClick}>Helpful</Button>
        //     <Button variant="contained" size="medium" disabled={this.state.disabledBad} 
        //     style={{backgroundColor: '#E34D4C', marginTop: 20,marginLeft: 30, outline:'none', 
        //     borderRadius: 10, fontWeight: 'bold', textTransform:'none', 
        //     boxShadow:'none',}} onClick={this.handleNotHelpfulClick}
        //     > Not Helpful</Button>
                    

        //         </CardContent>
        //     </Card>
        //   </Grid>
        // </Grid>
    //       </MuiThemeProvider>
          
    //    </Dialog>);            
   }




  render(){
    const { classes } = this.props;

    if(this.state.redirectReview){
      this.props.history.push({
        pathname:"/clientReview",
        state:{
          currentTicketIDClient: this.state.currentTicketID,
        }
      })
    }

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
              <p>Welcome to your ACNAPI Dashboard. Your ticket statistics: </p>
              <Grid container>
              <Grid item xs style={{alignItems: 'center', alignContent: 'center',textAlign: 'center'}}>
              <p style={{display:'inline-block', fontWeight: 'bold'}}>Total of Tickets Sent</p>
              <p>{this.state.newTicketCount + this.state.progressTicketCount + this.state.closedTicketCount}</p>
              </Grid>
              </Grid>
              <Grid container>
              <Grid item xs style={{alignItems: 'center', alignContent: 'center',textAlign: 'center'}}>
              <p style={{display:'inline-block', fontWeight: 'bold', color: 'red'}}>New</p>
              <p>{this.state.newTicketCount}</p>
              </Grid>
              <Grid item xs style={{alignItems: 'center', alignContent: 'center', textAlign: 'center'}}>
              <p style={{display:'inline-block', fontWeight: 'bold', color: 'blue'}}>In Progress</p>
              <p>{this.state.progressTicketCount}</p>
              </Grid>
              <Grid item xs style={{alignItems: 'center', alignContent: 'center', textAlign: 'center'}}>
              <p style={{display:'inline-block', fontWeight: 'bold', color: 'green'}}>Closed</p> 
              <p>{this.state.closedTicketCount}</p>
              </Grid>
              </Grid>
              <Divider />
              <Typography variant="h5" className="guttertop" style={{fontWeight: 'bold'}}>
              Support Policy
              </Typography>
              <Typography style={{textAlign: 'justify'}}>
               We respond to any form of enquiries which are not limited to:
               <ul>
                 <li>Technical</li>
                 <li>Billing</li>
                 <li>Sales</li>
                 <li>Product Enquiry</li>
                 <li>General Enquiry</li>
               </ul>
               <br/>
               If you would like more information on ACNAPI or our products, click <a href="https://beta.acnapi.io" target="_blank">here</a>.
              </Typography>
            </CardContent>
        </Card> 
        {/* <Card className={classes.stats}>
          <CardContent>
            <Typography variant="h5"> 
                Live Chat
            </Typography>
            {this.state.chatwidget}
            <Divider />
            </CardContent>
        </Card> */}
        </Grid>
      </Grid>

    )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(withRouter, withStyles(styles))(SimpleCard);
