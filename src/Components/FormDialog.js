import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Add from '@material-ui/icons/AddCircle';
import { TextField, InputLabel, Select, OutlinedInput } from '@material-ui/core';
import 'filepond/dist/filepond.min.css';
import * as FilePond from 'filepond';
import FileAttach from './FileAttach';
import MultipleSelect from './MultipleSelect';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 500,
    maxWidth: 500,
  },
});

const topics = [
  'API DevOps',
  'AR Menu',
  'Smart Lock',
  'Iot Led Wall',
  'Others',
];

const priority = [
  'Low',
  'Normal',
  'High',
  'Urgent',
];

function getStyles(topic, that) {
  return {
    fontWeight:
      that.state.topics.indexOf(topics) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class FormDialog extends React.Component {



  state = {
    open: false,
    scroll: 'paper',
    title: '',
    message: '',
    topics: [],
    priority: '',
    severity: '',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false, 
    topics: []
  });
  };

  setTitle = (event) => {
    this.setState({title: event.target.value})
  }

  setMessage = (event) => {
    this.setState({message: event.target.value})
  }

  handleSubmit = (e) => {
    if(this.state.message  === '' || this.state.title === '' || this.state.topics===[] || this.state.priority === '' || this.state.severity === ''){
      //console.log('not clear')
      toast.error('Subject title, topics, message and priority/severity required.',{
        position: "bottom-center"
      });
      
    }
    if(this.state.message !== '' && this.state.title !== '' && this.state.topics !== '' && this.state.priority !== '' && this.state.severity !== ''){
      toast.success('Your query has been submitted.', {
        position: "bottom-center"
      });
      axios.post(`https://esc-ticket-service.lepak.sg/ticket`, {
          title: this.state.title,
          message: this.state.message,
          priority: this.state.priority,
          severity: this.state.severity,
          // priority: 0,
          // severity: 0,

      }, {
        headers: {
          'Content-Type': 'application/json',
          // legit token
          'X-Parse-Session-Token': 'r:85d020c6dbeb6a0680bca1c96487b6ce',

          // not legit token
          // 'X-Parse-Session-Token': 'r:ef8dfea3cadc3b75e8606ecbdd49a19e',


          // rememeber to change session token!!!!!
        }
      })
      .then((res) => {
        if(res.request.status === 200){
          console.log('success send ticket') 
        }
        this.setState({
          addTicket: true,
        })

      })
      this.setState({ open: false, topics: [], priority: '', severity: '', addTicket: false});

    }
  };


  handleChange = event => {
    this.setState({ 
      topics: event.target.value }, function(){
    });
    console.log(this.state.priority);
  };

  handleChangePriority = event => {
    this.setState({ priority: event.target.value }, function(){
    });
  };

  handleChangeSeverity = event => {
    this.setState({ severity: event.target.value }, function(){
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Add className="icon" onClick={this.handleClickOpen('paper')}/>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          disableBackdropClick = {true}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Open a Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Contact us and ask your questions.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label="Subject Title"
              type="subject"
              variant="outlined"
              fullWidth
              onChange={this.setTitle}
            />
            <div className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">Topics</InputLabel>
          <Select
            multiple
            value={this.state.topics}
            input = {
              <OutlinedInput
              labelWidth={50}
              name="topics"
              id="outlined-topics-simple"
            />
            }
            onChange = {this.handleChange}
          >
            {topics.map(topic => (
              <MenuItem key={topic} value={topic} style={getStyles(topic, this)}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl> 
        
        {/* priority for ticket system  */}

        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            value={this.state.priority}
            onChange={this.handleChangePriority}
            inputProps={{
              name: 'priority',
              id: 'priority-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Normal</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Urgent</MenuItem>
          </Select>
        </FormControl> */}
        
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-priority-simple" >
            Priority
          </InputLabel>
          <Select
            value={this.state.priority}
            onChange={this.handleChangePriority}
            input={
              <OutlinedInput
                labelWidth={50}
                name="priority"
                id="outlined-priority-simple"
              />
            }
          >
          <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Normal</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Urgent</MenuItem>
          </Select>
        </FormControl>
      
        {/* severity for ticket system  */}

        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="severity">Severity</InputLabel>
          <Select
            value={this.state.severity}
            onChange={this.handleChangeSeverity}
            inputProps={{
              name: 'severity',
              id: 'severity-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Normal</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Critical</MenuItem>
          </Select>
        </FormControl> */}
        
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-severity-simple" >
            Severity
          </InputLabel>
          <Select
            value={this.state.severity}
            onChange={this.handleChangeSeverity}
            input={
              <OutlinedInput
                labelWidth={50}
                name="severity"
                id="outlined-severity-simple"
              />
            }
          >
          <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Normal</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={4}>Critical</MenuItem>
          </Select>
        </FormControl>

        </div>
            <TextField
              autoFocus
              margin="normal"
              id="message"
              label="Question"
              type="question"
              variant="outlined"
              fullWidth
              multiline
              onChange={this.setMessage}

            />
            <DialogContentText>
              Attachments
            </DialogContentText>
            <FileAttach />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme:true})(FormDialog);
