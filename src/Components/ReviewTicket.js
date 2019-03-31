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
import { Card, CardContent, Grid } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  root:{
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ReviewTicket extends React.Component {
  state = {
    open: true,
    dateOpened: '',
    timeOpened: '',
  };

  
  handleClose = () => {
    this.setState({
      open: false,
      redirect: false,
    });
  };

  componentDidMount(){
    console.log("CHILD" + this.props.currentT);
    
    // edit the open time given in the getTicket to get open_date and open_time
    if(this.props.currentT[this.props.currentT.length-1]){
      this.setState({
        dateOpened:this.props.currentT[this.props.currentT.length-1].substring(0,9),
        timeOpened: this.props.currentT[this.props.currentT.length-1].substring(11,16),
      })
    }
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.props.onClose}
        >
          <AppBar className="appbar">
            <Toolbar>
              
              <Typography variant="h6" color="inherit">
                {"Review Ticket " + this.props.currentT[0]}
              </Typography>
              <Button color="inherit" onClick={this.props.onClose} className="button2">
                save
              </Button>
            </Toolbar>
          </AppBar>
              <div className={classes.root}>
        <Grid container>
          <Grid item xs={8}>
            <Card className="reviewTicketCard">
            <CardContent> 
              <Typography inline>
                {"Ticket #" + this.props.currentT[0] + " | " + "Priority: "} 
              </Typography>
              <Typography inline style={{color: 'red'}}>
                HIGH
              </Typography>
              {/* <p className="bg"> HIGH </p> */}
              <h4>{this.props.currentT[2]}</h4>
              <Typography>
              <h6>{this.props.currentT[3]}</h6>
              </Typography>
            </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="reviewTicketInfo">
            <CardContent>
              <h5>Contact Information</h5>
              <Divider/>
              <Typography>Submitted by: {this.props.currentT[4]}</Typography>
              <Typography>Email: </Typography>
              <Typography>Phone Number: </Typography>
              <h5>Ticket Information</h5>
              <Typography>Ticket ID: {this.props.currentT[0]}</Typography>
              <Typography>Categories: </Typography>
              <Typography>Date Opened by User: {this.state.dateOpened}</Typography>
              <Typography>Time Opened by User: {this.state.timeOpened}</Typography>




            
            </CardContent>

            </Card>
          </Grid>
        </Grid>
      </div>
        </Dialog>
      </div>
    );
  }
}

ReviewTicket.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewTicket);
