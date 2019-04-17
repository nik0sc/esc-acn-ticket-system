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
import { Card, CardContent, Grid, FormControl, Select, InputLabel, OutlinedInput, MenuItem } from '@material-ui/core';
import { CardActions, TextField, Paper } from 'material-ui';


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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root2: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 80,
    marginLeft: 30,
    width: 800,
    height: 150,
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

class ReviewTicket extends React.Component {

  constructor() {
    super();
      this.state = {
        currentT: '',
        open: true,
        dateOpened: '',
        timeOpened: '',
        status: "0",
        team: "0",
      }
    };
 
  // state = {
  //   open: true,
  //   dateOpened: '',
  //   timeOpened: '',
  //   status: "0",
  //   team: "0",
  //   currentT: '',
    
  // };

  
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
        dateOpened:this.props.currentT[this.props.currentT.length-1].substring(0,10),
        timeOpened: this.props.currentT[this.props.currentT.length-1].substring(12,18),
      })
      
    }

    this.setState({
      currentT: this.props.currentT,
    })
    
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, function() {
      console.log("CHANGES: " + this.state.currentT);
    });
  };

  handleChangeTeam = event => {
    const newC = this.state.currentT.slice();

    //temp, should be 8, will change
    newC[7] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      currentT: newC 
    }, function(){
      console.log("CHANGES: " + this.state.currentT);
    })

   
  };





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
                {"Review Ticket"}
              </Typography>
              <Button color="inherit" onClick={this.props.onClose(this.state.currentT)} className="button2">
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
                {"Ticket #" + this.props.currentT[0]} 
              </Typography>
              {/* title */}
              <h4>{this.props.currentT[2]}</h4> 
              {/* message */}
              <h6>{this.props.currentT[3]}</h6>
            </CardContent>
            </Card>

          </Grid>
          <Grid item xs={4}>
            <Card className="reviewTicketInfo">
            <CardContent>
              <h5>Contact Information</h5>
              <Divider/>
              <Typography>Full Name: {this.props.currentT[5]}</Typography>
              <Typography>Username: {this.props.currentT[4]}</Typography>
              <Typography>Email: </Typography>
              <Typography>Phone Number: </Typography>
              <h5>Ticket Information</h5>
              <Typography>Ticket ID: {this.props.currentT[0]}</Typography>
              <Typography>Priority: {this.props.currentT[6]}</Typography>   
              <Typography>Priority: {this.props.currentT[7]}</Typography>         
              <Typography>Categories: </Typography>
              <Typography>Date Opened by User: {this.state.dateOpened}</Typography>
              <Typography>Time Opened by User: {this.state.timeOpened}</Typography> 
              <h5>Admin Actions</h5>
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
                <InputLabel htmlFor="outlined-team-simple" >
              Assigned Team
            </InputLabel>
            <Select
              value={this.state.team}
              onChange={this.handleChangeTeam}
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
        </Dialog>
      </div>
    );
  }
}

ReviewTicket.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewTicket);
